import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Containers/NavBar";
import { Home } from "./Pages/Home";
import { Discover } from "./Pages/Discover";
import { RecipeList } from "./Pages/RecipeList";
import { Error } from "./Pages/Error";
import { MealPlanner } from "./Pages/MealPlanner";
import { Footer } from "./Containers/Footer.jsx";
import styles from './Styles/MainPage.module.css'

// Only for demo purposes, will not be in the final production deployment.
import { config } from "./JavaScript/private-config.js";

// Goal:  Create a applications that can pull recipes from an online API based on the user's input, and provide an option for the user to save certain recipes to their "recipe book",
// saved in localStorage.

// TODO: 
// - Add a check to see if any excess recipes are available then prevent the user from changing to the next page by alerting them that no excess pages are available.
// - Style the project


// Add a check to the random meal inspiration, if no value comes back for the meal title, instead just
// have the image link to the discover page.
// Change all occurrences of FoodData Center to FoodData Central
// Condense down on the amount of components I use or use them in more places, display ingredients can be used in the display recipe component
// Also, rather than generating the meal title for the shopping list in the worker, move that to the ShoppingListDisplayContainer

// Requirements
//? All Requirements Completed!!!

// Please write functions that contain the following syntax that you learned in the MDN Asynchronous JavaScript Tutorial assignments, note you can have a function that contains multiple syntaxes that are required
// // - A function that uses web-workers
// // - Use of async and await keywords
// // - Use of Promise.any()
// // - Use of Promise.all() 
// // - Use of the .json() method
// // - Use of .then() method
// // - A function that is using promises and interacting with promises
// //- A function that uses the fetch() API

/**
 * @component 
 * Main Container for all web page components. The NavBar and Footer are constantly displayed and other components are injected in the page depending on the user's path or url.
 */
export function MainPage() {
  // Declares state variables to store the two api keys needed to provide credentials to the API calls made in the various child and grandchild components.
  const [RecipesAPIKey, setRecipesAPIKey ] = useState(config.recipeAPIKey || '');
  const [NutritionalAPIKey, setNutritionalAPIKey] = useState(config.nutritionalAPIKey || '');

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