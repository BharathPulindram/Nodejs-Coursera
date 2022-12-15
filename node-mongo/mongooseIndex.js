/* const express = require('express');
const mongoose = require('mongoose'); */
//require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import Data from "./data.js";
import UserSchema from "./dbModel.js";

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;
mongoose.set('strictQuery', true);

mongoose.connect(process.env.CONNECTION__URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});


app.get('/', (req, res) => {
    res.status(200).send("Bharath");
})

app.get("/user", (req, res) => {
    UserSchema.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });


app.post('/user', async (req, res) => {
    const user = req.body;

    UserSchema.create(user, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });

})

app.listen(port, () => {
    console.log('listening on port ' + port);
})