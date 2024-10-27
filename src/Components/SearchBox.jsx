import React, { useState } from "react";

/**
 * @component Displays a search box and stores the current text in state. Also, provides the option for the user to press enter to set their search input.
 * @param {function} updateSearch - Sets the state of a string that will be searched by the Ninja Recipe API.
 */
export function SearchBox({updateSearch}) {
    const [ currentText, setCurrentText ] = useState('')

    /**
     * @function Updates the search state variable using the passed in setState function or alerts the user to enter a valid search query.
     */
    function searchRecipe() {
        // Either the user's search is updated and set withe the currentText variable as an argument.
        // or an alert is made to the user to enter a valid search if the string is empty to avoid unnecessary API calls.
        if (currentText != '') {
            updateSearch(currentText)
        } else {
            alert('Enter a valid recipe name before searching...')
        }
    }

    /**
     * @function Checks the input key pressed by the user to see if the 'Enter' key was press which denotes the user wants to trigger the searchRecipe function.
     * @param {string} key - The key code pressed by the user.
     */
    function checkKey(key) {
        if (key == 'Enter') {
            searchRecipe();
        }
    }

    return (
        <div>
            <button onClick={searchRecipe}>🔎</button>
            <input onChange={(e) => setCurrentText(e.target.value)} onKeyUp={(e) => checkKey(e.code)} value={currentText} id="user-search-box" placeholder="Enter a recipe name..."/>
        </div>
    )
}