const express = require("express");
const cors = require("cors");
require('./db/config');
const app = express();
const User = require("./db/User");
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.listen(5000);
