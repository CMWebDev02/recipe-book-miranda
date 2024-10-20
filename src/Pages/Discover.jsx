import React, { useEffect, useState } from "react";
import { SearchBox } from "../Components/SearchBox";
import { useNavigate } from "react-router-dom";

/**
 * Discover
 * @component Displays the discovery page to allow the user to enter a search for a recipe. 
 * @param {string} APIKey - API key string that will be used to provide credentials when making fetch calls .
 */
export function Discover({ APIKey }) {
    // Declares the state for the user's search input.
    const [ userSearch, setUserSearch ] = useState('');
    // Declares a navigation variable.
    const navigate = useNavigate();

    // Rerenders the component if the userSearch state variable changes.
    useEffect(() => {
        // Checks if the userSearch variable is an empty string.
        if (userSearch != '') {
            // If the string is not empty, navigate the user to the recipelist component and pass in the recipe search as a url query.
            navigate(`/recipelist?recipe=${userSearch}&page=1`);
        }
    }, [userSearch])

    return (
        <>
            <h1>Enter A Recipe Name</h1>
            <p>Search far and wide for all kinds of recipes.</p>
            {/* Displays a SearchBox component and passes in the setUserSearch function as an argument */}
            <SearchBox updateSearch={setUserSearch} />
        </>
    )
}