const express = require('express');
const app = express();
const PORT = 8000;

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

app.post("/api/create_users", (req, res)=>{
  const body = req.body;
  console.log(body);
  return res.json("status:success")
});

app.post("/api/authenticate_users", (req, res)=>{
  const body = req.body;
  console.log(body);
  const html = `
  <h1>Login successfull</h1>
  `
  return res.send(html);
});

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));