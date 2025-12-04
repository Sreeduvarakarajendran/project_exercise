import express from 'express';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(__dirname);
const app = express();
const port = 3000;

app.get("/",(rq,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port,()=>{
    console.log('server is running on port ' + port);
})