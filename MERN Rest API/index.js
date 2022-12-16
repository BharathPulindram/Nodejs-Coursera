const mongoose = require('mongoose');
const Users = require('./models/userModel');
const CONNECTION__URL = require('./connectionString');

mongoose.set('strictQuery', true);
const connect = mongoose.connect(CONNECTION__URL);
connect.then(db => {
    console.log("connected to MongoDB");
    var newUser = Users({
        email:"abc@example.com"
    })
    newUser.save()
    .then(user => {
        console.log(user);
        return newUser.find({});
    })
    .then(users => {
        console.log(users);
        return newUser.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log("err",err);
    });
})
