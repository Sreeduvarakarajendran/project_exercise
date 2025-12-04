import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// function to avoid repeating code
function getPageData(extra = {}) {
  const date = new Date();
  const day = date.getDay();

  return {
    day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day],
    advice: "Work hard today!",
    fruitlist: ["apple", "banana", "mango", "grapes"],
    nameSize: "",
    ...extra
  };
}

// GET → show page
app.get("/", (req, res) => {
  res.render("index", getPageData());
});

// POST → handle form submit (IMPORTANT: /submit)
app.post("/submit", (req, res) => {
  const nameLength = req.body["fname"].length + req.body["password"].length;

  res.render("index", getPageData({ nameSize: nameLength }));
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});



// import express from 'express';
// import bodyParser from 'body-parser';
// const app = express();
// const port = 3000;


// app.set("view engine","ejs");

// app.use(bodyParser.urlencoded({extended:true}));


// app.get('/',(req,res)=>{
//     const date = new Date();
//     const day = date.getDay();
//     let arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     let fruit = ["apple", "banana", "mango", "grapes"];

//     res.render("index",{
//         day: arr[day], advice : "Work hard today!",
//         fruitlist : fruit
//     })
// })

// app.post('/',(req,res)=>{
//     const date = new Date();
//     const day = date.getDay();
//     let arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     let fruit = ["apple", "banana", "mango", "grapes"];

//     const namelenght = req.body["fname"].length + req.body["password"].length;
//     res.render("index",{day: arr[day], advice : "Work hard today!",fruitlist : fruit,nameSize : namelenght});
// })

// app.listen(port ,() => {
//     console.log("server " + port);
// });
