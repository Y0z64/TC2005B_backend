const express = require("express");

const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");

//routes
const userRoutes = require("./routes/userRoutes");
const descriptionRoutes = require("./routes/descriptionRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes")
const chatOpenRoutes = require("./routes/chatOpenRoutes")

//express functions
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//endpoints
app.use("/users", userRoutes);
app.use("/description", descriptionRoutes);
app.use("/chat", chatOpenRoutes);
app.use("/feedback", feedbackRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
