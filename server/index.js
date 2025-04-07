//////////////////////////
// Imports
//////////////////////////

import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

//////////////////////////
// Constants
//////////////////////////

const port = 8080;
const pathToDistFolder = path.join(__dirname, "../frontend/dist");
const app = express();

//////////////////////////
// Middleware/Controllers
//////////////////////////
const serveTrendingGifs = async (req, res) => {
  const url = `https://api.giphy.com/v1/gifs/trending?limit=3&rating=g&api_key=${process.env.API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data); // send back the Giphy response
  } catch (error) {
    console.error("Error fetching Giphy data:", error.message);
    res.status(503).send({ error: "Unable to fetch trending gifs" });
  }
};

const serverSearchedGifs = async (req, res) => {
  const search = req.query;
};

const serveStatic = express.static(pathToDistFolder);

app.use(serveStatic);

// Routes
app.get("/api/gifs", serveTrendingGifs);

//////////////////////////
// Listener
//////////////////////////

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
