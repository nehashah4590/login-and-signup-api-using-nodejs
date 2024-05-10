const express = require('express');
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;

const uri = "mongodb+srv://ernehashah822:neha123@cluster0.uhcmytd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// connecting to mongoDB
mongoose.connect(uri,{dbName: "signupandlogin"}).then(() => {
  console.log("Connected to cluster 0 db");
}).catch((e)=>
{
  console.log(e);
})

//Schema
const registerUser = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  number:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
},{timestamps:true});

const User = mongoose.model("user", registerUser);


      
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) =>{
  const html = `
  <h1>Welcome to Homepage.</h1>
  <a href="/signup"><button>Go to signup page</button></a>
  <a href="/login"><button>Go to login page</button></a>
  `

res.send(html);
});

app.get('/signup', (req, res) =>{
  const html = `
  <form action="/api/create_users" method="post">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name" required><br>

  <label for="username">Username:</label><br>
  <input type="text" id="username" name="username" required><br>

  <label for="email">Email:</label><br>
  <input type="email" id="email" name="email" required><br>

  <label for="number">Phone Number:</label><br>
  <input type="text" id="number" name="number" required><br>

  <label for="password">Password:</label><br>
  <input type="password" id="password" name="password" required><br>


  <input type="submit" value="Submit">
</form>`

res.send(html);
})

app.get('/login', (req, res) =>{
  const html = `
  <form action="/api/authenticate_users" method="post">

  <label for="username">Username:</label><br>
  <input type="text" id="username" name="username" required><br>

  <label for="password">Password:</label><br>
  <input type="password" id="password" name="password" required><br>

  <input type="submit" value="Submit">
</form>`

res.send(html);
})

app.post("/api/create_users", async(req, res)=>{
  const body = req.body;
  if(!body || !body.name || !body.username || !body.email|| !body.number || !body.password){
    return  res.status(400).json({msg : "All fields are required"});
  }

  const result = await User.create({
    name: body.name,
    username: body.username,
    email: body.email,
    number: body.number,
    password: body.password,
  })
  console.log(result);
  return res.status(201).json({msg:"success"})
});

app.post("/api/authenticate_users", async(req, res)=>{
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" });
  }

  try {
      const user = await User.findOne({ username , password });

      if (!user) {
          return res.status(401).json({ msg: "Invalid username or password" });
      }
      return res.status(200).json({ msg: "Login successful" });
  } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ msg: "Internal server error" });
  }
});

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));