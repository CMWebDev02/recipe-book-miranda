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
// Create a web worker to take in a string and convert it to title from a sentence or pascal case.
// // Also have the worker take in a image src and convert the last bit to a usable recipe title.
// - Have webWorker gather all nutrient totals from nutritional info and add them together.
// - Have webworker create a shopping list of all collected ingredients and have them return an array of shoppingList Items.
// - Utilize await and async or promises to implement the various web workers when they are to gather nutritional info for all items and have them add it up to a total,
//    to utilize the workers the way they are intended, making calculations.
// - Create Home Page
// - Add heading to display if no recipes are saved locally.

// Requirements
// Please write functions that contain the following syntax that you learned in the MDN Asynchronous JavaScript Tutorial assignments, note you can have a function that contains multiple syntaxes that are required
// - Use of Promise.any()
// - Use of async and await keywords
// - A function that uses web-workers

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