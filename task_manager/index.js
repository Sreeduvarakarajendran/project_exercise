import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

const tasks = [
  { id: 1, title: "Buy groceries", status: "pending" },
  { id: 2, title: "Complete Node.js project", status: "done" },
  { id: 3, title: "Read a book", status: "pending" },
  { id: 4, title: "Workout for 30 minutes", status: "done" },
  { id: 5, title: "Plan weekend trip", status: "note" }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/tasks", (req, res) => {
  res.json(tasks);
});


app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: req.body.status
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (req.body.status) task.status = req.body.status;
  if (req.body.title) task.title = req.body.title;

  res.json(task);
});


app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted", tasks });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
