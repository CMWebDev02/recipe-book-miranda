import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Containers/NavBar";
import { Home } from "./Pages/Home";
import { Discover } from "./Pages/Discover";
import { RecipeList } from "./Pages/RecipeList";
import { Error } from "./Pages/Error";
import { MealPlanner } from "./Pages/MealPlanner";

// Goal:  Create a applications that can pull recipes from an online API based on the user's input, and provide an option for the user to save certain recipes to their "recipe book",
// saved in localStorage.

// TODO: 
// - Have webWorker gather all nutrient totals from nutritional info and add them together.
// - Have webworker create a shopping list of all collected ingredients and have them return an array of shoppingList Items.
// - Add a .env file to git ignore and give the users options to store their API key in there.
// - Have only ten local recipes Display per Page;
// - Add heading to display if no recipes are saved locally.
// - Remove the temporary searched recipes
// - Implement JSON Server to store previous nutritional searches and potentially previous recipe searches.
// // This is likely to be the best way to do this or I could do API integration with FireBase 
// Find a way to improve total nutrient calculations.


// Style the project

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

export function MainPage() {
  const [RecipesAPIKey, setRecipesAPIKey ] = useState('');
  const [nutritionalAPIKey, setNutritionalAPIKey] = useState('');

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