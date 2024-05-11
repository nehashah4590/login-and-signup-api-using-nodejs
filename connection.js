const mongoose = require("mongoose");

async function connectMongoDb(uri){
     return  mongoose.connect(uri,{dbName: "signupandlogin"})
}

module.exports = {
    connectMongoDb,
} 