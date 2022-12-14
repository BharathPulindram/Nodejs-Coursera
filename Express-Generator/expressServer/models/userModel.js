const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    street: String,
    city: String,
    state: String,
    postCode: Number
});

const UserSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    gender:String,
    phone_number:String,
    birthdate: Number,
    location: locationSchema,
    username:String,
    password:String,
    first_name:String,
    last_name:String,
    title:String,
    picture:String
})


var users = mongoose.model('user',UserSchema);

module.exports = users;