const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findAllMovies = () => {
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
};

//1. find movie by id

const findById = () => {
  const { id } = req.params;
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  const movie = movies.find((movie) => movie.id === parseInt(id));
  // console.log(movie);
  res.json({ messege: movie });
};
app.get("/movie/:id", findById);

//2. delete move from arrey

app.delete("/movie/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const movies = findAllMovies();

  const updatedMovies = movies.filter((movie) => movie.id !== movieId);
  const movieString = JSON.stringify(updatedMovies, null, 4);
  fs.writeFileSync("data/movies.json", movieString);
  res.json({ messege: "Deleted" });
});

//3. add new movie to arrey

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

app.post("/movie/create/:name", createNewMovie);

//4. update movie data

app.put("/movie/update/:name");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
