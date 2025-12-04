import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended : true}));

function validation(req,res,next){
    let name = req.body["name"];
    let password = req.body["password"];
    if(password == "secret"){
       req.isValidUser = true;
        next();
    }
    else{
        res.send("<h1>Access Denied</h1>");
    }
}
app.use(morgan('tiny'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

// app.post('/submit',validation);

app.post('/submit',validation,(req,res)=>{
    if(req.isValidUser == true){
        res.sendFile(__dirname + '/public/website.html');
    }
});

app.listen(port,()=>{
    console.log('Server' + port);
})