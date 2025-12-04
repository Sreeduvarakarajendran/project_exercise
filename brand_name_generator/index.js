import express from 'express';
// import bodyParser from 'body-bodyParser';
const app = express();
const port = 3000;


// Serve static files from the `public` directory (CSS, images, client JS)
app.use(express.static('public'));

app.set("view engine","ejs");

app.get('/',(req,res) => {
    res.render("index",{different_name: ""});
})


app.post('/button',(req,res) =>{
    const adj = ["Swift", "Brave", "Clever", "Mighty", "Nimble"];
    const nouns = ["Lion", "Eagle", "Shark", "Panther", "Wolf"];
    const adj_pick = adj[Math.floor(Math.random() * adj.length)];
    const noun_pick = nouns[Math.floor(Math.random() * nouns.length)]
    const dif_name = adj_pick + " " + noun_pick;
    res.render("index",{different_name: dif_name});
})



app.listen(port,() => {
    console.log('Server running on port ' + port);
});