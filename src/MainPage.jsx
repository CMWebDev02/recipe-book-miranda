import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Containers/NavBar";
import { Home } from "./Pages/Home";
import { Discover } from "./Pages/Discover";
import { RecipeList } from "./Pages/RecipeList";
import { Error } from "./Pages/Error";

// Goal:  Create a applications that can pull recipes from an online API based on the user's input, and provide an option for the user to save certain recipes to their "recipe book",
// saved in localStorage.

// TODO: 
// - Create Home Page
// - Add heading to display if no recipes are saved locally.
// - Create a weekly meal plan page that allows the user to select what meals will be made on set days of the week.
// - Add worker to take list of ingredients from the various recipes and convert them to an array of items. 
// - Have webworker create a shopping list of all collected ingredients and have them return an array of shoppingList Items.
// - Utilize await and async or promises to implement the various web workers when they are to parse or gather the needed shopping list items.
// - Utilize promise.all or promise.any to get nutritional info for all ingredients in a recipe using the food-data-central-api

// - If needed, have the web workers be used to run the userKeyChange.js file.

// Requirements
// Please write functions that contain the following syntax that you learned in the MDN Asynchronous JavaScript Tutorial assignments, note you can have a function that contains multiple syntaxes that are required
// - Use of Promise.all() and Promise.any()
// - Use of async and await keywords
// - A function that uses web-workers

// // - Use of the .json() method
// // - Use of .then() method
// // - A function that is using promises and interacting with promises
// //- A function that uses the fetch() API

export function MainPage() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <NavBar />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/recipelist" element={<RecipeList />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}