const User = require("../models/user");
 
async function handleCreateNewUser(req, res) {
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
}

async function handleAuthenticateUser(req, res) {
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
}

module.exports = {
    handleCreateNewUser,
    handleAuthenticateUser,
}