const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.post("/", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
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
router.delete("/:id", (req, res, next) => {

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

router.get("/:id", (req, res, next) => {

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

router.get("/" + "", (req, res, next) => {
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

module.exports = router;