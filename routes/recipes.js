const express = require('express');
const router = express.Router();
// in routes/stuff.js

const RecipeController = require('../controllers/Recipes');

router.post("/", RecipeController.CreateRecipe);

router.put("/:id", RecipeController.PutRecipes);

router.delete("/:id", RecipeController.DeleteRecipe);

router.get("/:id", RecipeController.Recipe);

router.get("/" + "", RecipeController.AllRecipe);

module.exports = router;