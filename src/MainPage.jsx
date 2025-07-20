import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NavBar } from "./Containers/NavBar.jsx";
import { Home } from "./Pages/Home.jsx";
import { Discover } from "./Pages/Discover.jsx";
import { RecipeList } from "./Pages/RecipeList.jsx";
import { Error } from "./Pages/Error.jsx";
import { MealPlanner } from "./Pages/MealPlanner.jsx";
import { Footer } from "./Containers/Footer.jsx";

import styles from './Styles/MainPage.module.css'

// Demo purposes only, not in final product deployment
import { config } from './JavaScript/private-config.js'

// Goal:  Create a applications that can pull recipes from an online API based on the user's input, and provide an option for the user to save certain recipes to their "recipe book",
// saved in localStorage.

// TODO:
// Future Changes 
  // Condense down on the amount of components I use or use them in more places, display ingredients can be used in the display recipe component
  // Rather than generating the meal title for the shopping list in the worker, move that to the ShoppingListDisplayContainer

/**
 * @component 
 * Main Container for all web page components. The NavBar and Footer are constantly displayed and other components are injected in the page depending on the user's path or url.
 */
export function MainPage() {
  // Declares state variables to store the two api keys needed to provide credentials to the API calls made in the various child and grandchild components.
  const [RecipesAPIKey, setRecipesAPIKey ] = useState('');
  const [NutritionalAPIKey, setNutritionalAPIKey] = useState('');

  return (
      <BrowserRouter>
        <NavBar RecipesAPI={[RecipesAPIKey, setRecipesAPIKey]}
          NutritionalAPI={[NutritionalAPIKey, setNutritionalAPIKey]} />
        <div className={styles.mainPageContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover APIKey={RecipesAPIKey} />} />
            <Route path="/recipelist" element={<RecipeList APIKey={RecipesAPIKey} displayLocal={false} />} />
            <Route path="/booklet" element={<RecipeList APIKey={RecipesAPIKey} displayLocal={true} />} />
            <Route path="/planner/*" element={<MealPlanner NutritionalAPIKey={NutritionalAPIKey} />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
  )
}