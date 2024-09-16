import React, { useState } from "react";


export function SearchBox({updateSearch}) {
    const [ currentText, setCurrentText ] = useState('')

    function searchRecipe() {
        if (currentText != '') {
            updateSearch(currentText)
        } else {
            alert('Enter a valid recipe name before searching...')
        }
    }

    function checkKey(key) {
        if (key == 'Enter') {
            searchRecipe();
        }
    }

    return (
        <>
            <button onClick={searchRecipe}>🔎</button>
            <input onChange={(e) => setCurrentText(e.target.value)} onKeyUp={(e) => checkKey(e.code)} value={currentText} id="user-search-box" placeholder="Enter a recipe name..."/>
        </>
    )
}