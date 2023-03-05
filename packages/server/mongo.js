const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' // validate if url is original-DB or test-DB
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

// Connect whit mongoDB
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connection success')
  }).catch(err => {
    console.error(err)
  })

// disconnect whit mongoDB
process.on('uncaughtException', () => {
  mongoose.disconnect()
})
