require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require('./routes/users');
const newsRouter = require("./routes/newsdata");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);
app.use('/news',newsRouter)

mongoose.connect('mongodb://127.0.0.1:27017/auth',  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(4000, () => console.log("Server started"));



