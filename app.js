const express = require('express')
const blog = require('./models/blogs')
const app = express()
const dbconnect = 'mongodb+srv://root:Gim7mrgPCiFwMNnd@cluster0.3xdbpb5.mongodb.net/justanotherblog?retryWrites=true&w=majority'
const mongoose = require('mongoose')
mongoose.connect(dbconnect,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>console.log('connected to db'))
.catch((err)=>console.log(err))


app.set('view engine','ejs')
app.listen(3000)

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/create',(req,res)=>{
    const newBlog = new blog({
        title:'new blog 2',
        body:'new blog body'
    })
    newBlog.save().then(result=>res.send(result)).catch(err=>console.log(err))
})


app.get('/about',(req,res)=>{
    res.render('about')
})

app.get((req,res)=>{
    res.render('404')}
    )