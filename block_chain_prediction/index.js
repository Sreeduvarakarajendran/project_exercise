import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import ejs from 'ejs';

const app = express();
const port = 3000;


const LAT = -33.34;
const LNG = 115.342;
const ALT = 0;

const API_URL = `https://api.openuv.io/api/v1/uv?lat=${LAT}&lng=${LNG}&alt=${ALT}`;

const API_KEY = "openuv-ac490wrmin7mh18-io";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { "x-access-token": API_KEY }
        });

  
        res.render("index", { time: response.data.result.uv_time, uv: response.data.result.uv });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});
