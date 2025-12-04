import express from 'express';
import bodyParser from 'body-parser'

const app = express();
const port =3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

let blogs = [];


app.post('/submit',(req,res)=>{
    blogs.push({
        title: req.body.title,
        content: req.body.content
    });
    res.redirect("/");
    
})

app.get('/',(req,res)=>{
    res.render("index",{blogs:blogs});
})

app.listen(port, ()=>{
    console.log('Server running on port ' + port);
})