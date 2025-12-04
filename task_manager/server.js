import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// -----------------------------
// Routes
// -----------------------------

// Show task list
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        res.render("index", { tasks: response.data });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Show New Task form
app.get("/new", (req, res) => {
    res.render("modify", { heading: "New Task", submit: "Create Task", task: null });
});

// Show Edit Task form
app.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`${API_URL}/tasks/${id}`);
        res.render("modify", {
            heading: "Edit Task",
            submit: "Update Task",
            task: response.data
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// -----------------------------
// API Routes
// -----------------------------

// Create Task
app.post("/api/tasks", async (req, res) => {
    try {
        await axios.post(`${API_URL}/tasks`, req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update Task
app.patch("/api/tasks/:id", async (req, res) => {
    try {
        await axios.patch(`${API_URL}/tasks/${req.params.id}`, req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete Task
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        await axios.delete(`${API_URL}/tasks/${req.params.id}`);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// -----------------------------
// Start server
// -----------------------------
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
