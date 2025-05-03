const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kumutimam:${password}@cluster0.eckuzim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content:{
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
  date: Date,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
  result.forEach(notes => {
    console.log(notes)
  })
  mongoose.connection.close()
})
  
