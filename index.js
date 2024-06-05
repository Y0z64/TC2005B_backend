const express = require("express");

const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const descriptionRoutes = require("./routes/descriptionRoutes");


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/users", userRoutes);
app.use("/description", descriptionRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
