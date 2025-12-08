import express from "express";
import ejs from "ejs";
import pkg from "pg";
import bodyparser from "body-parser";

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


app.get("/", (req, res) => {
  res.render("index", { cont: "" });
});


app.post("/submit", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;


  const result = await db.query("SELECT * FROM users WHERE username = $1", [user]);

  let content = "";


  if (result.rows.length > 0) {
    const dbUser = result.rows[0];

    if (dbUser.password === password) {
      content = "You have successfully logged in.";
    } else {
      content = "Incorrect password!";
    }

  } else {
    
    await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      user,
      password
    ]);
    content = "Account created successfully!";
  }

  res.render("index", { cont: content });
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
