import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

let activity = '';
app.get('/',async (req,res) =>{
    try{
        const response = await axios.get('https://bored-api.appbrewery.com/random');
        res.render("index",{activity: response.data});
    } catch (error) {
        console.error(error);
        res.render("index",{activity: response.data});
    }
})
app.post('/submit', async (req,res)=>{
    try{
    const randomType = req.body['random-type'];
    const userOptions = req.body['no-of-options'];
    const response = await axios.get(`https://bored-api.appbrewery.com/random?type=${randomType}&participants=${userOptions}`);
    res.render("index",{activity: response.data});
    } catch (error) {
        console.error(error);
        res.render("index",{activity: response.data});
    }
})






app.listen(port, ()=>{
    console.log('Server running on port ' + port);
})