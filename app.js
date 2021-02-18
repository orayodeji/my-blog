const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');

const { result } = require("lodash");
const { render } = require("ejs");

const blogRoutes = require('./routes/blogRoutes')

const PORT = process.env.PORT || 3000;


//express app
const app = express()

//connect to mong
const dburl = "mongodb+srv://tunji:Bolaji93,@nodetuts.2wjqz.mongodb.net/nodetuts?retryWrites=true&w=majority"
mongoose.connect(dburl, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>{
    app.listen(PORT)
    console.log("connected to db")
})
.catch((err)=>{
    console.log(err)
})

//register view engine
app.set('view engine', 'ejs')

//listen for request
//app.listen(3000)

//middleware and static file
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


// sending response
app.get("/",(req, res)=>{
   
    res.redirect('/blogs');
       
})

app.get("/about",(req, res)=>{
    res.render('about',{title: "About"})
   
})


//blog routes
app.use('/blogs', blogRoutes);

// 404Page 
app.use((req, res)=>{
    res.render('404', {title: "404"})
    //res.sendFile("./views/404.html",{ root:__dirname })
}) 
