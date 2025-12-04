import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/", async(req,res) =>{
    try{
    const response = await axios.get(`${API_URL}/posts`);
     console.log("Posts received:", response.data); 
    res.render("index",{posts:response.data});
    }
    catch(error){
        res.status(500).send(error.message);

    }

})


app.get("/new", (req,res)=>{
    // const response = await axios.get
    res.render("modify",{ heading: "New Post", submit: "Create Post" });
} )

app.get("/edit/:id", async(req,res)=>{
     try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});


app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

app.post("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }

});

app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})