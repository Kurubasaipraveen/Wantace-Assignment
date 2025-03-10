require("dotenv").config();
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.error("MongoDB connection error:", err));

const seedRecipes = [
  {
    title: "Spaghetti Carbonara",
    category: "Italian",
    ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Pancetta", "Black Pepper"],
    instructions: "Cook spaghetti. Mix eggs, cheese, and pepper. Add pancetta. Combine with pasta.",
    image: "https://example.com/spaghetti.jpg"
  },
  {
    title: "Chicken Biryani",
    category: "Indian",
    ingredients: ["Chicken", "Rice", "Spices", "Yogurt", "Onions"],
    instructions: "Marinate chicken. Cook rice with spices. Layer and cook together.",
    image: "https://example.com/biryani.jpg"
  },
  {
    title: "Chocolate Cake",
    category: "Dessert",
    ingredients: ["Flour", "Sugar", "Cocoa Powder", "Eggs", "Butter"],
    instructions: "Mix ingredients. Bake at 180°C for 30 minutes.",
    image: "https://example.com/chocolate-cake.jpg"
  }
];

const seedDB = async () => {
  try {
    await Recipe.deleteMany(); // Clears existing recipes
    await Recipe.insertMany(seedRecipes);
    console.log("Database Seeded Successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding Error:", error);
    mongoose.connection.close();
  }
};

seedDB();
