import express from 'express';
import bodyparser from 'body-parser';
import axios from 'axios';
import ejs from 'ejs';
import pg from 'pg';
import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
   user: "postgres",
  host: "localhost",
  database: "world",
  password: "Duvaraka_26",
  port: 5432,
})

db.connect();


const app = express();
const port = 3000;


app.use(bodyparser.urlencoded({ extended : true}))
app.set("view engine","ejs");
app.use(express.static("public"))

app.get("/",async(req,res)=>{
    const resposnse = await db.query("SELECT country_code FROM visited_countries");
    let array = [];
    resposnse.rows.forEach((country) => {
        array.push(country.country_code)
        
    });
    res.render("index",{countries:array,total:array.length})
})

app.post("/add", async (req, res) => {
    const selectCountry = req.body.country;  
    const result = await db.query(
        "SELECT country_code FROM countries WHERE country_name = $1",
        [selectCountry]
    );
    console.log(result);
    console.log(selectCountry);
    if (result.rows.length !== 0) {
        const data = result.rows[0];
        const countryCode = data.country_code;

        await db.query(
            "INSERT INTO visited_countries (country_code) VALUES ($1)",
            [countryCode]
        );
    }

    res.redirect("/");
});


app.listen(port,()=>{
    console.log(`Server has running on ${port}`);
})