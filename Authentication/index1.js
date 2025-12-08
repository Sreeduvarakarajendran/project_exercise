import express from "express";
import ejs from "ejs";
import pkg from "pg";
import bodyparser from "body-parser";
import bcrypt, { hash } from 'bcrypt';

const { Client } = pkg;

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));


const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Duvaraka_26",
  port: 5432
});

db.connect();

const saltRound = 10;

app.get("/", (req, res) => {
  res.render("index", { cont: "" });
});


app.post("/submit", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;


  const result = await db.query("SELECT * FROM users WHERE username = $1", [user]);
  let content = "";

  if(result.row.length > 0){
    const dbuser = result.row[0];

    const passwordMatch = await bcrypt.compare(password,db.password);

    if(passwordMatch)
        content = "you have been login successfully";

    else{
        const hash = await bcrypt.hash(password,saltRound);

        await db.query("INSERT INTO user (username , password) VALUES ($1,$2)",[user,password]);
        
        content = "Account is created";
        
    }
  }

        res.render("index", { cont: content });
 
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
