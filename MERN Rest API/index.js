const mongoose = require('mongoose');
const Users = require('./models/userModel');


const connect = mongoose.connect(CONNECTION__URL);
connect.then(db => {
    console.log("connected to MongoDB");
    var newUser = Users({
        email:"abc@example.com",
    })
})
