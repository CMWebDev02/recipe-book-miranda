import React, { useState } from "react";

/**
 * SearchBox
 * @component Displays a search box and stores the current text in state. Also, provides the option for the user to press enter to set their search input.
 * @param {function} updateSearch - Sets the state of a string that will be searched by the Ninja Recipe API.
 */
export function SearchBox({updateSearch}) {
    // Declares a state variable to store the current text in the input textbox.
    const [ currentText, setCurrentText ] = useState('')

    /**
     * searchRecipe
     * @function Updates the search stateString using the passed in setState function or alters the user to enter a valid search query.
     */
    function searchRecipe() {
        // Checks if the current text is an empty string.
        if (currentText != '') {
            // If the the string is not empty,
            // Calls the updateSearch function and passes in the currentText variable as an argument.
            updateSearch(currentText)
        } else {
            // If the string is empty,
            // Alter the user to enter a valid search query.
            alert('Enter a valid recipe name before searching...')
        }
    }

    /**
     * checkKey
     * @function Checks the input key pressed by the user.
     * @param {string} key - String of the key code pressed by the user.
     */
    function checkKey(key) {
        // Checks if the key variable is equal to the key code 'Enter'
        if (key == 'Enter') {
            // If the key code is equal to enter,
            // Calls the searchRecipe Function
            searchRecipe();
        }
    }

    return (
        <>
            {/* Declares a button to call the searchRecipe function */}
            <button onClick={searchRecipe}>🔎</button>
            {/* Declares a textbox that will update with the value of the currentText state variable and checks each key press by the user. */}
            <input onChange={(e) => setCurrentText(e.target.value)} onKeyUp={(e) => checkKey(e.code)} value={currentText} id="user-search-box" placeholder="Enter a recipe name..."/>
        </>
    )
}