require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const dbUser = process.env.API_USER;
const dbHost = process.env.API_HOST;
const dbName = process.env.API_DB;
const dbPassword = process.env.API_PASSWORD;

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: 5432,
});

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api/users", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  res.send(rows);
});

app.get("/api/favorites", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM favorites");
  res.send(rows);
});

app.post("/api/favorites", async (req, res) => {
  const { id, user_id } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO favorites (id, user_id) VALUES (${id}, ${user_id})`
  );

  res.send(rows);
});

app.listen(8000, () => {
  console.log("API escuchando en el puerto 8000");
});