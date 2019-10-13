const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const recipesRoutes = require('./routes/recipes');
//Mongo DB conn string: mongodb+srv://WandeFish:<password>@cluster0-y0g2w.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://WandeFish:hab552@cluster0-y0g2w.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    }).catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use('/api/recipes', recipesRoutes);

module.exports = app;