require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require('./routes/users');
const Base_URL= process.env.Base_URL
const PORT=process.env.PORT || 4000
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);

mongoose.connect(Base_URL,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(PORT, () => console.log("Server started"));



