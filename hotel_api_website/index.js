import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

const recipeJson = '[{"name":"chicken","location":"California","rating":4.5},{"name":"beef","location":"Zubrowka","rating":4.8},{"name":"fish","location":"Colorado","rating":4.2}]'
app.set("view engine","ejs");
app.use(express.static("public"));
let data = '';
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render("index",{data: null});
})
app.post('/submit',(req,res)=>{
    const receipe = req.body.choice;
    if(receipe === "chicken")
       data = JSON.parse(recipeJson)[0];
    else if(receipe === "beef")
        data = JSON.parse(recipeJson)[1];
    else
        data = JSON.parse(recipeJson)[2];

    res.render("index", { data: data });
});

app.listen(port,()=>{
    console.log('Server running on port ' + port);
})