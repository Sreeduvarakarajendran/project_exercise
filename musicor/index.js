import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
const port = 3000;
let brand = '';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
   const name = req.body.name || '';
   const password = req.body.password || '';
   const brand = name + password;
   res.send(`<h1>You My New Guy</h1>${brand}`);
});

app.listen(port, () => {
   console.log('Server ' + port);
});
