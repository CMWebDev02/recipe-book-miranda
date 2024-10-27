import React, { useEffect, useState } from "react";
import { SearchBox } from "../Components/SearchBox";
import { useNavigate } from "react-router-dom";
import styles from '../Styles/Discover.module.css'

/**
 * @component Displays the discovery page which allow the user to enter recipe name to search for. 
 * @param {string} APIKey - API key string that will be used to provide credentials when making fetch calls .
 */
export function Discover({ APIKey }) {
    const [ userSearch, setUserSearch ] = useState('');
    const navigate = useNavigate();

    // Rerenders the component if the userSearch state variable changes.
    useEffect(() => {
        if (userSearch != '') {
            // The user's search is injected into the url which redirects them to RecipeList component where their searched recipes are displayed.
            // Also, a pageQuery parameter is injected into the url as well to keep track of what page of results the user is currently at, starting with page 1.
            navigate(`/recipelist?recipe=${userSearch}&page=1`);
        }
    }, [userSearch])

    return (
        <div className={styles.mainContainer}>
            <div>
                <h1>Enter A Recipe Name</h1>
                <p>Search far and wide for all kinds of recipes.</p>
                <SearchBox updateSearch={setUserSearch} />
            </div>
        </div>
    )
}