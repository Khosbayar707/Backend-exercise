const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// read file
app.get("/movies", (req, res) => {
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  res.json(movies);
});

// add new obj to json
app.get("/movies/create", (req, res) => {
  const { name } = req.query;
  // 1. read file
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  // 2. push to json
  movies.push({ id: Date.now(), name });
  // 3. write json file
  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);

  res.json({ messege: "Success" });
});

// update obj of json
app.get("/movies/update", (req, res) => {
  const { id, name } = req.query;

  // 1. read file
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  // 2. find the movie by id
  const movie = movies.find((movie) => movie.id === 1736158100990);

  // 3. Update the movie name
  movie.name = name;

  // 4. update the json arrey
  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);

  res.json({ messege: "Updated" });
});

app.get("/movies/delete", (req, res) => {
  const { id } = req.query;

  // 1. Read the file
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);

  // 2. Filter out the movie with the given id
  const updatedMovies = movies.filter((movie) => movie.id !== parseInt(id));

  // Check if any movie was deleted
  if (updatedMovies.length === movies.length) {
    return res.status(404).json({ message: "Movie not found" });
  }

  // 3. Write the updated array back to the file
  const moviesString = JSON.stringify(updatedMovies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);

  res.json({ message: "Deleted" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
