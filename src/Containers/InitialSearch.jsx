import React from "react";
import { SearchBox } from "../Components/SearchBox";

export function InitialSearch({ searchResult, updateSearch, hasSearched }) {
    return (
        <>
            <h1>Enter A Recipe Name</h1>
            <p>Search far and wide for all kinds of recipes.</p>
            <SearchBox searchResult={searchResult} updateSearch={updateSearch} hasSearched={hasSearched} />
        </>
    )
}