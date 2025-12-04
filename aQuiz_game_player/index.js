import express from 'express';
import ejs from 'ejs';
import bodyparser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Duvaraka_26",
  port: 5432,
});

db.connect();

db.query("SELECT * FROM capitals",(err,res)=>{
    if(err){
        console.log(err.stack);
    }
    else{
        quiz = res.rows;
    }
  db.end();
});

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

let currentQuestion = {};
let totalScore = 0;

app.get("/", (req, res) => {
    nextQuestion(); 
    res.render("index", { 
        question: currentQuestion.country,   
        capital: currentQuestion.capital,    
        wasCorrect: null,
        totalScore: totalScore
    });
});

app.post("/submit", (req, res) => {
    let answer = req.body.answer.trim();
    let isCorrect = false;

    if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
        totalScore++;
        isCorrect = true;
    }

    nextQuestion();

    res.render("index", {
        question: currentQuestion.country,  
        capital: currentQuestion.capital,
        wasCorrect: isCorrect,
        totalScore: totalScore,
    });
});

function nextQuestion() {
    const randomIndex = Math.floor(Math.random() * quiz.length);
    currentQuestion = quiz[randomIndex];
}

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
