import React from "react";


export function SearchBox({ searchResult, updateSearch, hasSearched }) {
    function handleClick() {
        if (searchResult != '') {
            console.log('Change Page to discover if needed');
            console.log(searchResult);
    
            hasSearched(true);
        } else {
            alert('Enter a valid recipe name before searching...')
        }
    }

    return (
        <>
            <button onClick={handleClick}>🔎</button>
            <input onChange={(e) => updateSearch(e.target.value)} value={searchResult} id="user-search-box" placeholder="Enter a recipe name..."/>
        </>
    )
}