const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Import Recipe model
const Recipe = require("./models/Recipe");

// Default recipes
const defaultRecipes = [
  {
    name: "Spaghetti Bolognese",
    ingredients: ["Spaghetti", "Ground Beef", "Tomato Sauce", "Onion", "Garlic"],
    instructions: "Cook pasta, prepare sauce with beef and tomatoes, mix and serve.",
  },
  {
    name: "Chicken Curry",
    ingredients: ["Chicken", "Coconut Milk", "Curry Powder", "Garlic", "Onion"],
    instructions: "Cook chicken with spices, add coconut milk, simmer and serve.",
  },
  {
    name: "Vegetable Stir Fry",
    ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Soy Sauce", "Garlic"],
    instructions: "Stir-fry vegetables with garlic and soy sauce, serve hot.",
  }
];

// Get all recipes
app.get("/api/recipes", async (req, res) => {
  try {
    let recipes = await Recipe.find();
    
    // If no recipes exist, add default ones
    if (recipes.length === 0) {
      recipes = await Recipe.insertMany(defaultRecipes);
      console.log("Default recipes added.");
    }

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
});

// Get a recipe by ID
app.get("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
});

// Create a new recipe
app.post("/api/recipes", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: "Error adding recipe", error });
  }
});

// Update a recipe by ID
app.put("/api/recipes/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
