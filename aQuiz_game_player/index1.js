import express from 'express';
import bodyparser from 'body-parser';
import axios from 'axios';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
const port = 3000;

let flags = [];
let isCorrect = false;

const db = new client({
    user:"postgres",
    host:"localhost",
    database:"world",
    password:"Duvaraka_26",
    port:5432
})
db.connect();
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine","ejs")
app.use(express.static("public"))

db.query("SELECT * FROM flags",(err,res)=>{
    if(err){
        console.log(err.stack);
    }
    else{
        flags = res.rows;
    }
    db.end();
});

let currentFlag = "";

app.get("/",async(req,res)=>{
    await nextFlag();
    res.render("index",{
        flag:currentFlag,
        wasCorrect:isCorrect,
    });
})
app.post("/submit",(req,res)=>{
    const answer = req.body.answer.trim();
    const isCorrect = false;
    if(answer === currentFlag.flag)
    {
        isCorrect:true;
    }
    nextFlag();
    res.render("index",{ flag:currentFlag,
        wasCorrect:isCorrect,})
    
})

async function nextFlag(){
    const randomFlag = Math.floor(Math.random() * flags.length)
    currentFlag = flags[randomFlag];
}


app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})