const express = require("express");
const PORT = process.env.PORT || 5000;
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { User } = require("./models/usersModels");
mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));
// custom middleware
const checkUserAuthentication = require("./middlewares/checkUserAuthentication");
app.use(checkUserAuthentication);
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(cors(["*"]));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", require("./routes/usersRoute.js"));
app.use("/apartments", require("./routes/apartment.js"));
app.use("/cities", require("./routes/city.js"));

app.get("/", async function (req, res) {
  var user = await User.find({})
  res.render("pages/index", {user: user.slice(-1)});
});

app.get("/users/login-view", async function (req, res) {
  var user = await User.find({})
  res.render("pages/user-login-view", {user: user.slice(-1)});
});

app.get("/users/register-view", async function (req, res) {
  var user = await User.find({})
  res.render("pages/user-register", {user: user.slice(-1)});
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
