import React from "react";
import { NavBar } from "./Containers/NavBar";
import { Discover } from "./Pages/Discover";
import { RecipeList } from "./Pages/RecipeList";

// Goal:  Create a applications that can pull recipes from an online API based on the user's input, and provide an option for the user to save certain recipes to their "recipe book",
// saved in localStorage.

// TODO: 
// - Implement React Routing and query Parameters for RecipeList Page.
// - Create and add .env file to hide api key.
// - Design RecipeBook Page
// - Display the recipes from localStorage to the RecipeBook page
// - Implement ReactRouting
// - Add ability to retrieve more than 10 search results via query parameters.

export function MainPage() {
  return (
    <>
      <NavBar />
      <hr />
      {/* <Discover /> */}
      <RecipeList />
    </>
  )
}