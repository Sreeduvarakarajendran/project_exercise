import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = "https://secrets-api.appbrewery.com";
const yourBearerToken = "08f3026d-9c6c-4d88-a3b2-c579dc106247";

const config = {
    headers: {
        Authorization: `Bearer ${yourBearerToken}`,
    },
};

app.get("/", (req, res) => {
    res.render("index", { content: "" });
});

// ---------------- GET SECRET -----------------
app.post("/get-secret", async (req, res) => {
    let searchId = req.body.id;

    try {
        const response = await axios.get(API_URL + "/secrets/" + searchId, config);
        res.render("index", { content: JSON.stringify(response.data) });
    } catch (error) {
        res.render("index", { content: error.message });
    }
});

// ---------------- POST SECRET -----------------
app.post("/post-secret", async (req, res) => {
    let searchId = req.body.id;

    try {
        const response = await axios.post(
            API_URL + "/secrets/" + searchId,
            req.body,
            config
        );
        res.render("index", { content: JSON.stringify(response.data) });
    } catch (error) {
        res.render("index", { content: error.message });
    }
});

// ---------------- PUT SECRET -----------------
app.post("/put-secret", async (req, res) => {
    let searchId = req.body.id;

    try {
        const response = await axios.put(
            API_URL + "/secrets/" + searchId,
            {
                secret: req.body.secret,
                score: req.body.score,
            },
            config
        );
        res.render("index", { content: JSON.stringify(response.data) });
    } catch (error) {
        res.render("index", { content: error.message });
    }
});

// ---------------- PATCH SECRET -----------------
app.post("/patch-secret", async (req, res) => {
    let searchId = req.body.id;

    try {
        const response = await axios.patch(
            API_URL + "/secrets/" + searchId,
            {
                score: req.body.score, // only one field updated
            },
            config
        );
        res.render("index", { content: JSON.stringify(response.data) });
    } catch (error) {
        res.render("index", { content: error.message });
    }
});

// ---------------- DELETE SECRET -----------------
app.post("/delete-secret", async (req, res) => {
    let searchId = req.body.id;

    try {
        const response = await axios.delete(
            API_URL + "/secrets/" + searchId,
            config
        );
        res.render("index", { content: JSON.stringify(response.data) });
    } catch (error) {
        res.render("index", { content: error.message });
    }
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
