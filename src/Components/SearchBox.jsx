import React from "react";


export function SearchBox({ searchResult, updateSearch, redirectToList }) {
    function searchRecipe() {
        if (searchResult != '') {
            redirectToList();
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
            <input onChange={(e) => updateSearch(e.target.value)} onKeyUp={(e) => checkKey(e.code)} value={searchResult} id="user-search-box" placeholder="Enter a recipe name..."/>
        </>
    )
}