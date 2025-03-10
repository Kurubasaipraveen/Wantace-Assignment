import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState({
    title: "",
    category: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setUpdatedRecipe({
          title: response.data.title,
          category: response.data.category,
          ingredients: response.data.ingredients.join(", "),
          instructions: response.data.instructions,
        });
      })
      .catch(error => console.error("Error fetching recipe:", error));
  }, [id]);

  const handleUpdate = () => {
    const formattedData = {
      ...updatedRecipe,
      ingredients: updatedRecipe.ingredients.split(",").map(i => i.trim()),
    };

    axios.put(`http://localhost:5000/api/recipes/${id}`, formattedData)
      .then(response => {
        setRecipe(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error("Error updating recipe:", error));
  };

  if (!recipe) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2> {isEditing ? "Edit Recipe" : recipe.title}</h2>

      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedRecipe.title}
            onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, title: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            value={updatedRecipe.category}
            onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, category: e.target.value })}
            style={styles.input}
          />
          <textarea
            value={updatedRecipe.ingredients}
            onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value })}
            style={styles.textarea}
          />
          <textarea
            value={updatedRecipe.instructions}
            onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, instructions: e.target.value })}
            style={styles.textarea}
          />
          <button onClick={handleUpdate} style={styles.saveButton}>💾 Save</button>
          <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          <button onClick={() => setIsEditing(true)} style={styles.editButton}> Edit</button>
          <button onClick={() => navigate(-1)} style={styles.backButton}>⬅ Back</button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "auto",
    transition: "0.3s",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "none",
  },
  editButton: {
    padding: "8px 12px",
    backgroundColor: "#ffc107",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  saveButton: {
    padding: "8px 12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "8px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  backButton: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default RecipeDetails;
