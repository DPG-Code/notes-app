const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id // Change output from _id to id
    delete returnedObject._id // Delete _id
    delete returnedObject.__v // Delete __v
    delete returnedObject.passwordHash // This line hides the password
  }
})

userSchema.plugin(uniqueValidator) // Adding unique field

const User = model('User', userSchema)

module.exports = User
