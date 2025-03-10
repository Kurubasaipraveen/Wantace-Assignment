import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("https://wantace-assignment-1.onrender.com/api/recipes")
      .then(response => setRecipes(response.data))
      .catch(error => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📖 Recipe List</h2>
      <ul style={styles.list}>
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <li key={recipe._id} style={styles.listItem}>
              <Link to={`/recipe/${recipe._id}`} style={styles.link}>
                {recipe.title}
              </Link>
            </li>
          ))
        ) : (
          <p style={styles.noRecipes}>No recipes found! Try adding one.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  addButton: {
    display: "inline-block",
    marginBottom: "15px",
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "0.3s",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "12px",
    margin: "10px 0",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "color 0.3s",
  },
  noRecipes: {
    color: "#777",
    fontStyle: "italic",
  },
};

// Hover effect for list items
styles.listItem[':hover'] = { transform: "scale(1.02)" };
styles.link[':hover'] = { color: "#0056b3" };

export default RecipeList;
