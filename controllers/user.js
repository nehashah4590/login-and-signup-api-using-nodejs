const User = require("../models/user");
const { setUser, getUser,} = require("../service/auth");
 
async function handleCreateNewUser(req, res) {
    const {name, username, email, number, password} = req.body;
    if( !name || !username || !email|| !number || !password){
      return  res.status(400).json({msg : "All fields are required"});
    }
  
    const result = await User.create({
       name,
      username,
      email,
      number,
      password,
    })
    // return res.status(201).json({msg:"success"})
    return res.render('signup',{msg:"signup success"} );
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
        // return res.status(200).json({ msg: "Login successful" });
        const token = setUser(user);
        res.cookie("uid", token);
        return res.render('login', {msg:"Login success"});
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = {
    handleCreateNewUser,
    handleAuthenticateUser,
}