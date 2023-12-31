require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const kitsItemsController = require("./controllers/kitItemsController");
// const kitsController = require("./controllers/kitController");
const PORT = process.env.PORT || 3025;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("/api/contentCreators", require("./routes/api/contentCreators"));
const Users = require("./controllers/UserController");
const BankAccount = require("./controllers/BankController");
const TransactionController = require("./controllers/TransactionController");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/heath", {
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});
// app.use(kitsItemsController);
app.use(Users);
app.use(BankAccount);
app.use(TransactionController);
// app.use(kitsController);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});