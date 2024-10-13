import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Containers/NavBar";
import { Home } from "./Pages/Home";
import { Discover } from "./Pages/Discover";
import { RecipeList } from "./Pages/RecipeList";
import { Error } from "./Pages/Error";
import { MealPlanner } from "./Pages/MealPlanner";

// Only for demo purposes, will not be in the final production deployment.
import { config } from "./JavaScript/private-config.js";

// Goal:  Create a applications that can pull recipes from an online API based on the user's input, and provide an option for the user to save certain recipes to their "recipe book",
// saved in localStorage.

// TODO: 
// - Implement indexDb database to store searches

// - Have only ten local recipes Display per Page.
// - Add heading to display if no recipes are saved locally.

// Fix shopping list displaying below the view window, make it like a modal.
// Style the project

export function MainPage() {
  const [RecipesAPIKey, setRecipesAPIKey ] = useState(config.recipeAPIKey || '');
  const [nutritionalAPIKey, setNutritionalAPIKey] = useState(config.nutritionalAPIKey || '');

  return (
    <div className="main-container">
      <BrowserRouter>
        <NavBar RecipesAPI={[RecipesAPIKey, setRecipesAPIKey]}
          nutritionalAPI={[nutritionalAPIKey, setNutritionalAPIKey]} />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover APIKey={RecipesAPIKey} />} />
          <Route path="/recipelist" element={<RecipeList APIKey={RecipesAPIKey} displayLocal={false} />} />
          <Route path="/booklet" element={<RecipeList APIKey={RecipesAPIKey} displayLocal={true} />} />
          <Route path="/planner/*" element={<MealPlanner nutritionalAPIKey={nutritionalAPIKey} />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}