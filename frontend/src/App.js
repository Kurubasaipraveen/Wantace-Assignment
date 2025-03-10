import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeForm from "./components/RecipeForm";

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <h1>🍲 Recipe Manager</h1>
        <nav>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/add-recipe" style={styles.link}>➕ Add Recipe</Link>
        </nav>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/add-recipe" element={<RecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  link: {
    margin: "0 10px",
    textDecoration: "none",
    color: "#007bff",
  },
};

export default App;
