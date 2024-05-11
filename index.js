const express = require('express');
const { connectMongoDb } = require("./connection");
const path = require("path");
const { logReqRes } = require("./middleware");
const userRouter = require('./routes/user');
const staticRouter = require('./routes/staticRouter');
const app = express();
const PORT = 8000;
const uri = "mongodb+srv://ernehashah822:neha123@cluster0.uhcmytd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Connection
connectMongoDb(uri).then(() => {
  console.log("Connected to cluster 0 db");
}).catch((e)=>
{
  console.log(e);
});

//Middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api", userRouter);
app.use("/", staticRouter);

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));