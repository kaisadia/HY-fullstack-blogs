const mongoose = require('mongoose')


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://kaisadiakhate:${password}@cluster0.effqlyi.mongodb.net/test?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
const Blog = mongoose.model('Blog', blogSchema)

if(process.argv.length === 3 ) {
    Blog.find({}).then((res) => {
        console.log(res)
        })
        mongoose.connection.close()
} else if (process.argv.length === 7) {
    const Blog = new Blog({
        title: process.argv[3],
        author: process.argv[4],
        url: process.argv[5],
        likes: process.argv[6]
    })
    Blog.save().then((result) => {
        console.log(`Added blog by ${Blog.author}`)
        mongoose.connection.close()
    })
}

