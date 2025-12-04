import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const app = express();
const port = 3000;

const username ='';
const password = '';
const apiKey = '';
const apiToken = '';

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res) =>{
    res.render("index",{api_details: ""});
})

app.get






app.listen(port, () =>{
    console.log("Server is running on port " + port);
})