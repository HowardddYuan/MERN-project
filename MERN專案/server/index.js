const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute=require("./routes").auth;
const courseRoute=require("./routes").course
const passport=require("passport");
require("./config/passport")(passport)
const cors=require("cors")

mongoose
  .connect("mongodb://localhost:27017/mernDB")
  .then(() => {
    console.log("Connecting to mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/api/user",authRoute)

//course route should be procted by jwt, if jwt is not in header of request, the request is invalid
app.use("/api/courses",passport.authenticate("jwt", {session:false}) ,courseRoute)

//登入的使用者才能新增課程或註冊課程 with jwt


app.listen(8080, ()=>{
    console.log('Backend Server running on port 8080')
})
