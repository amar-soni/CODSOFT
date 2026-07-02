const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({
  path: __dirname + "/.env"
});

const Contact = require("./models/contact");

const app = express();
app.get("/",(req,res)=>{
  res.send("backend is running");
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);

    await contact.save();

    res.json({
      message: "Message Sent Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});