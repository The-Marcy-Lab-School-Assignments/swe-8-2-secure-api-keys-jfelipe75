import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;
const distPath = path.join(__dirname, "../frontend/dist");

//////////////////////////
// Serve frontend
//////////////////////////
app.use(express.static(distPath));

//////////////////////////
// Giphy API Routes
//////////////////////////

// GET /api/gifs — Trending Gifs
app.get("/api/gifs", async (req, res) => {
  const url = `https://api.giphy.com/v1/gifs/trending?limit=3&rating=g&api_key=${process.env.API_KEY}`;
  console.log("API KEY:", process.env.API_KEY); // should log actual key
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Error fetching trending GIFs:", error.message);
    res.status(503).send({ error: "Unable to fetch trending gifs" });
  }
});

//////////////////////////
// Fallback: React App
//////////////////////////
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

//////////////////////////
// Start Server
//////////////////////////
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
