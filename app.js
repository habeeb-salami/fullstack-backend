const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const Recipe = require('./models/recipe');
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

app.post("/api/recipes", (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
        _id: req.body._id
    });

    recipe.save().then(() => {
        res.status(201).json({
            message: 'New Recipe saved successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});

app.put("/api/recipes/:id", (req, res, next) => {
    //console.log(req.body);
    res.status(201).json({
        message: "Recipe updated successfully!",
        data: req.body
    });
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
        _id: req.body._id
    });
    Recipe.updateOne({
        _id: req.params.id
    }, recipe).then(() => {
        res.status(201).json({
            message: 'Thing updated successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});
app.delete("/api/recipes/:id", (req, res, next) => {

    Recipe.deleteOne({
        _id: req.params.id
    }).then(() => {
        res.status(200).json({
            message: 'Deleted!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});

app.use("/api/recipes/:id", (req, res, next) => {

    Recipe.findOne({
        _id: req.params.id
    }).then((recipe) => {
        res.status(200).json({
            data: recipe
        });
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
});

app.use("/api/recipes", (req, res, next) => {
    Recipe.find().then((recipes) => {
        res.status(200).json({
            data: recipes
        });
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

module.exports = app;