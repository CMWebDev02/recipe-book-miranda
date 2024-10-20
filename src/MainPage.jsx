import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Containers/NavBar";
import { Home } from "./Pages/Home";
import { Discover } from "./Pages/Discover";
import { RecipeList } from "./Pages/RecipeList";
import { Error } from "./Pages/Error";
import { MealPlanner } from "./Pages/MealPlanner";
import { Footer } from "./Containers/Footer.jsx";

// Only for demo purposes, will not be in the final production deployment.
import { config } from "./JavaScript/private-config.js";

// Goal:  Create a applications that can pull recipes from an online API based on the user's input, and provide an option for the user to save certain recipes to their "recipe book",
// saved in localStorage.

// TODO: 
// - Add a check to see if any excess recipes are available then prevent the user from changing to the next page by alerting them that no excess pages are available.
// - Double check that all workers trigger appropriate updates.
// - Style the project

// Requirements
// // All Requirements Completed!!!

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
 * MainPage
 * @component Main Container for all web page components.
 */
export function MainPage() {
  // Declares state variables to store the two api keys.
  const [RecipesAPIKey, setRecipesAPIKey ] = useState(config.recipeAPIKey || '');
  const [NutritionalAPIKey, setNutritionalAPIKey] = useState(config.nutritionalAPIKey || '');

  return (
    // Main Div Class
    <div className="main-container defaultColors">
      {/* Initializes a browser router to change the component based on the current url. */}
      <BrowserRouter>
      {/* Initializes the NavBar to always be at the top of the page to provide access to it across all route components.*/}
        <NavBar RecipesAPI={[RecipesAPIKey, setRecipesAPIKey]}
          NutritionalAPI={[NutritionalAPIKey, setNutritionalAPIKey]} />
        <hr />
        {/* Initializes the various routes for each component. */}
        <Routes>
          {/* Displays the Home Component if the url points to the root path. */}
          <Route path="/" element={<Home />} />
          {/* Displays the Discover Component and passes in the RecipesAPIKey if the url points to the discover path. */}
          <Route path="/discover" element={<Discover APIKey={RecipesAPIKey} />} />
          {/* Displays the RecipeList Component and passes in the RecipesAPIKey and false boolean if the url points to the recipelist path. */}
          <Route path="/recipelist" element={<RecipeList APIKey={RecipesAPIKey} displayLocal={false} />} />
          {/* Displays the RecipeList Component and passes in the RecipesAPIKey and true boolean if the url points to the booklet path. */}
          <Route path="/booklet" element={<RecipeList APIKey={RecipesAPIKey} displayLocal={true} />} />
          {/* Displays the MealPlanner Component and passes in the NutritionalAPIKey if the url points to the planner path along with any url query parameter passed with it. */}
          <Route path="/planner/*" element={<MealPlanner NutritionalAPIKey={NutritionalAPIKey} />} />
          {/* Displays the Error Component if any invalid url or path is entered by the user. */}
          <Route path="/*" element={<Error />} />
        </Routes>
        {/* Initializes the Footer to appear at the bottom of the page to provide access to it across all route components. */}
        <Footer />
      </BrowserRouter>
    </div>
  )
}