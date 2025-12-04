import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const  port = 3000;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
})
app.post('/submit',(req,res)=>{
    console.log(req.body);
    res.send('Form submitted successfully!');
});

app.listen(port, ()=>{
    console.log('server is running on port ' + port);
})
