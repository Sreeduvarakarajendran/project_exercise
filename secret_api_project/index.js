import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import ejs from 'ejs';

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',async (req,res)=>{
    try{
    const response = await axios.get(API_URL + '/random');
    res.render("index",{secret : response.data.secret,user: response.data.username})
    }
    catch(error){
       res.render("index",{secret : "Error fetching secret", user: "Unknown"})
    }
})








app.listen(port,() =>{
    console.log('Server running on port ' + port);
})



