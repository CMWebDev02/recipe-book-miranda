import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom"
import { SearchedRecipes } from "../Containers/SearchedRecipes";
import { LocalRecipes } from "../Containers/LocalRecipes";

function alterPage(state, action) {
    if (action.type == 'nextPage') {
        return {
            pageNum: state.pageNum + 1            
        }
    } else if (action.type == 'previousPage') {
        return {
            pageNum: (state.pageNum - 1 < 0 ? 0 : state.pageNum - 1)
        }
    } 
    throw new Error('Unknown Action')
}

export function RecipeList() {
    const { recipe, page } = useParams();
    const [currentPage, setCurrentPage ] = useReducer(alterPage, {pageNum: page})
    const displayLocal = recipe == 'booklet';

    function handleClick(action) {
            setCurrentPage({type: action})
            console.log(currentPage)
    }

    return (
        <>
            {displayLocal && <LocalRecipes currentPage={currentPage} />}
            {!displayLocal && <SearchedRecipes recipeParam={recipe} currentPage={currentPage} />}

            <button onClick={() => handleClick('previousPage')}>Previous Page</button>
            <button onClick={() => handleClick('nextPage')}>Next Page</button>
        </>
    )
}