require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const AuthRoute = require("./routes/auth");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", (error) => console.error("Connected to Database"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log("Server Started"));

app.use("/api", AuthRoute);
