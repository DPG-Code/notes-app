const mongoose = require('mongoose')
const { Schema, model } = mongoose

// Model Note
const noteSchema = new Schema({
  content: String,
  description: String,
  date: Date,
  color: String,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id // Change output from _id to id
    delete returnedObject._id // Delete _id
    delete returnedObject.__v // Delete __v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
