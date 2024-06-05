// Este archivo obtiene toda la informacion de nuestros modelos (queries) y las funciones nos retorna el request

const db = require("../config/db");


async function getAllUsers(req, res) {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function createUser(req, res) {
  const { name, email, address, city, age, gender } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO users (name, email, address, city, age, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, address, city, age, gender]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.json({ message: "User deleted", user: result.rows[0] });
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

// You didn't provide the original code for updating a user, but here's a general idea of how it might look:
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, address, city, age, gender } = req.body;
  try {
    const result = await db.query(
      "UPDATE users SET name = $1, email = $2, address = $3, city = $4, age = $5, gender = $6 WHERE id = $7 RETURNING *",
      [name, email, address, city, age, gender, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser };
