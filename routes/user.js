const express = require('express');
const router = express.Router();
const {
  handleCreateNewUser, 
  handleAuthenticateUser, 
 }  = require("../controllers/user")


router.post("/create_users",handleCreateNewUser);
router.post("/authenticate_users",handleAuthenticateUser);


module.exports = router;