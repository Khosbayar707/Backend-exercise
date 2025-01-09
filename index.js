const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 4000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const findAllMovies = () => {
  const data = fs.readFileSync("data/movies.json", "utf8");
  return JSON.parse(data);
};

app.get("/", (req, res) => {
  const content = findAllMovies();
  res.send(content);
});

//1. find movie by id
const findById = (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  const movie = movies.find((movie) => movie.id === parseInt(id));
  res.json({ message: movie });
};
app.get("/movie/:id", findById);

//2. delete movie from array
const deleteMovie = (req, res) => {
  const movieId = req.params.id;
  const movies = findAllMovies();

  const updatedMovies = movies.filter((movie) => movie.id !== Number(movieId));
  const movieString = JSON.stringify(updatedMovies, null, 4);
  fs.writeFileSync("data/movies.json", movieString);
  res.json({ message: "Deleted" });
};
app.delete("/delete/:id", deleteMovie);

//3. add new movie to array
const createNewMovie = (req, res) => {
  const body = req.body;
  const movies = findAllMovies();
  movies.push({ id: Date.now(), ...body });
  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);
  res.json(movies);
};
app.post("/create", createNewMovie);

//4. update movie data
const updateMovie = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const movies = findAllMovies();

  const updateMovie = movies.map((movie) => {
    if (movie.id === Number(id)) {
      return { ...movie, ...body };
    }
    return movie;
  });

  const moviesString = JSON.stringify(updateMovie, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);

  res.json({ message: "Movie updated", movies });
};
app.put("/update/:id", updateMovie);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
