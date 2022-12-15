/* const express = require('express');
const mongoose = require('mongoose'); */
//require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

const app = express();

const port = process.env.PORT || 3000;
mongoose.set('strictQuery', true);

mongoose.connect(process.env.CONNECTION__URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.get('/', (req, res) => {
    res.status(200).send("Hello, world!");
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})