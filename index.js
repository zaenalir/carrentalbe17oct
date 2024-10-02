const express = require("express");
const http = require("http");
const pg = require("pg");
const { Client } = pg;
const PORT = 3000;

const app = express();
const server = http.createServer(app);
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "car_rental",
  password: "1234",
  port: 5432,
});

client.connect((err) => {
  console.log(err);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/about", (req, res) => {
  res.status(200).send("page about");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  res.status(200).send("register success");
});

app.get("/cars2", (req, res) => {
  client.query("SELECT * from cars")
    .then((data) => {
        res.status(200).json(data.rows);
    })
    .catch(err => console.log(err))
});

app.get("/cars", async (req, res) => {
  const data = await client.query("SELECT * from cars"); // your query string here
  console.log(data);
  res.status(200).json(data.rows);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
