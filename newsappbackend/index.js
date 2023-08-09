const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);

mongoose.connect('mongodb://localhost:27017/auth',  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(4000, () => console.log("Server started"));



