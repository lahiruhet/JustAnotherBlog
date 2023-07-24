require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const blog = require('./models/blogs')
const bodyParser = require('body-parser')
const app = express()
const dbconnect = process.env.DBURI
const mongoose = require('mongoose')
mongoose.connect(dbconnect,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>console.log('connected to db'))
.catch((err)=>console.log(err))


app.set('view engine','ejs')
app.listen(3000,()=>console.log('Listening from Port 3000'))
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/blogs',(req,res)=>{
    blog.find().then(result=>res.render('blogs',{blogs:result})).catch(err=>console.log(err))
    
})

app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/form',(req,res)=>{
    res.render('form')
})

app.post('/form',(req,res)=>{
    const {title, author, body} = req.body
    const newBlog = new blog({title, author, body})
    newBlog.save().then(result=>res.send(result)).catch(err=>console.log(err))
})

app.get(('/blogs/:id'),(req,res)=>{
    const blogId = req.params.id
    blog.findById(blogId).then(result=>{res.render('singleBlog',{blogData:result})}).catch(err=>console.log(err))

})
app.delete(('/blogs/:id'),(req,res)=>{
    const blogId = req.params.id
    blog.findByIdAndDelete(blogId).then(result=>{res.json({redirect:'/blogs'})}).catch(err=>console.log(err))

})

app.use((req,res)=>{
    res.status(404).render('404')}
    )

