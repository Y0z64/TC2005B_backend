const db = require("../config/db");

const getDescriptionById = async (id) => {
  try {
    const query =
      "SELECT U.name, d.description FROM users U JOIN description d ON U.id = d.user_id WHERE U.id = $1;";
    const { rows } = await db.query(query, [id]);
    return rows;
  } catch (error) {
    console.log(error);
    return { message: "An error occurred while fetching the description" };
  }
};

const createDescription = async (description, prescription, userId) => {
  try {
    const query =
      "INSERT INTO description (description, prescription, user_id) VALUES ($1, $2, $3) RETURNING *;";
    const { rows } = await db.query(query, [description, prescription, userId]);
    if (rows.length === 0) {
      return { message: "Failed to create description" };
    }
    return rows[0];
  } catch (error) {
    console.log(error);
    return { message: "An error occurred while creating the description" };
  }
};

module.exports = { getDescriptionById, createDescription };
