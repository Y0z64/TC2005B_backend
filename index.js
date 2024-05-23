const express = require("express");
const db = require("./config/db");

const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:id", async (req, res) => {
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
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
