const db = require("../config/db");

const getFeedbackByUserId = async (id) => {
  try {
    const query =
      "SELECT U.name, F.feedback, F.created_time FROM users U JOIN feedback F ON U.id = F.user_id WHERE U.id = $1;";
    const { rows } = await db.query(query, [id]);
    if (rows.length === 0) {
      return { message: "No feedback found for this user id" };
    }
    return rows;
  } catch (error) {
    console.log(error);
    return { message: "An error occurred while fetching the feedback" };
  }
};

module.exports = { getFeedbackByUserId };
