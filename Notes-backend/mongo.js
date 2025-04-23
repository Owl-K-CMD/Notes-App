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
  content: String,
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
/*
const notes = [
  {content: 'HTML is easy', date: new Date(), important: true},
  {content: 'CSS is hard', date: new Date(), important: false,},
  { content: 'Browser can execute only JavaScript', date: new Date(), important: false,},
]

Note.insertMany(note).then(result => {
  console.log('note saved!')
    console.log(result)
  mongoose.connection.close()
})
  */
Note.find({}).then(result => {
  result.forEach(notes => {
    console.log(notes)
  })
  mongoose.connection.close()
})
  
