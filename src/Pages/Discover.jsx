import React, { useEffect, useState } from "react";
import { SearchBox } from "../Components/SearchBox";
  
export function Discover() {
    const [ userSearch, setUserSearch ] = useState('');

    function redirectToList() {
      console.log("Navigate to RecipeList and add the user's search as a parameter")
    }

    return (
        <>
            <h1>Enter A Recipe Name</h1>
            <p>Search far and wide for all kinds of recipes.</p>
            <SearchBox searchResult={userSearch} updateSearch={setUserSearch} handleSearch={redirectToList} />
        </>
    )
}