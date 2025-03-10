import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecipeForm = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    ingredients: "",
    instructions: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipe.title || !recipe.category || !recipe.ingredients || !recipe.instructions) {
      setError("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/recipes", {
        ...recipe,
        ingredients: recipe.ingredients.split(",").map(item => item.trim()), // Convert to array
      });
      navigate("/");
    } catch (err) {
      setError("Failed to add recipe. Try again.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Add New Recipe</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={recipe.title}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={recipe.category}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={recipe.ingredients}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            resize: "none",
          }}
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            resize: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Recipe
        </button>
      </form>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default RecipeForm;
