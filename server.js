const express = require ('express');
const bodyParser = require ('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
var db 
MongoClient.connect('mongodb://amrgharz:a01234567810m@ds111430.mlab.com:11430/omar_posts' , ( err , client)=>{
    if(err) return console.log(err)
    db = client.db('omar_posts')
    app.listen( 3000 , function (){
        console.log('listining on port 3000')
    })
})
app.use(bodyParser.urlencoded({extended:true}))


app.get ('/' , (req , res) =>{
    db.collection('posts').find().toArray((err,result )=>{
        if (err) return console.log('err')
        res.render('index.ejs' , {posts:result})
    })  
})
app.post('/posts' , (req ,res)=>{
    db.collection('posts').save(req.body , (err , result)=>{
        if (err) return console.log('err')

        console.log('saved to database')
        res.redirect('/')
    })
})

app.set('view engine' , 'ejs')