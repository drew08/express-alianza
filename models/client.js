const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  sharedKey: {
    type: String,
    required: true
  },
  businessID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dataAdded: {
    type: String,
    required: true,
    default: Date.now
  },
  endDate: {
    type: String,
    required: true,
    default: Date.now
  }
 
})

module.exports = mongoose.model('Client', clientSchema)