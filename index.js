const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 3000;

app.use(express.json());

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
  const convertedNumber = parseInt(id);
  const movie = movies.find((movie) => movie.id === convertedNumber);

  // 3. Update the movie name
  movie.name = name;

  // 4. update the json arrey
  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);

  res.json({ messege: "Updated" });
});
// delete obj of json
app.get("/movies/delete", (req, res) => {
  const { id } = req.query;

  // 1. Read the file
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  const convertedNumber = parseInt(id);
  const movie = movies.filter((movie) => movie.id !== convertedNumber);

  const moviesString = JSON.stringify(movie, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);

  res.json({ message: "Deleted" });
});

const findById = () => {
  const { id } = req.params;
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  const movie = movies.find((movie) => movie.id === parseInt(id));
  // console.log(movie);
  res.json({ messege: movie });
};
app.get("/movie/:id", findById);

const deleteById = () => {
  const id = req.params.id;
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  const newMovieList = movies.filter((movie) => movie.id !== parseInt(id));
  const moviesString = JSON.stringify(newMovieList, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);
  res.json({ message: "Deleted" });
};
app.delete("/movie/:id", deleteById);

const createNewMovie = () => {
  const { name } = req.params;
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  movies.push({ id: Date.now(), name });
  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);
  console.log(name);
  res.json({ messege: "Success" });
};

app.post("/movie/:name", createNewMovie);

app.put("/movie/update/:name");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
