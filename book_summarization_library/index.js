import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';

const { Client } = pkg;

const app = express();
const port = 3000;

// EJS
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// DB Setup
const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Duvaraka_26",
  port: 5432
});

db.connect();


app.get("/", async (req, res) => {
  let result = await db.query("SELECT * FROM book ORDER BY id DESC");

  res.render("index", {
    sumbooks: result.rows
  });
});


app.get("/add", (req, res) => {
  res.render("new");
});

app.post("/submit", async (req, res) => {
  const { title, isbn, summary, rating, time } = req.body;

  const cover_url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  await db.query(
    "INSERT INTO book (title, isbn, summary, rating, booktime, cover_url) VALUES ($1,$2,$3,$4,$5,$6)",
    [title, isbn, summary, rating, time, cover_url]
  );

  res.redirect("/");
});


app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await db.query("DELETE FROM book WHERE id = $1", [id]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
