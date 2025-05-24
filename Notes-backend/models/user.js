const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    require: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    minLength: 8
  },
  note:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User