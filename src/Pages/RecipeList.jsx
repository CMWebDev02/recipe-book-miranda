import React, { useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { SearchedRecipes } from "../Containers/SearchedRecipes";
import { LocalRecipes } from "../Containers/LocalRecipes";

function alterPage(state, action) {
    if (action.type == 'nextPage') {
        return {
            pageNum: state.pageNum + 1            
        }
    } else if (action.type == 'previousPage') {
        return {
            pageNum: (state.pageNum - 1 < 1 || state.pageNum <= 0 ? 1 : state.pageNum - 1)
        }
    } 
    throw new Error('Unknown Action')
}

export function RecipeList() {
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    const [ recipeQuery, setRecipeQuery ] = useState(
        queryParameters.get('recipe')
    )
    const [ pageQuery, setPageQuery ] = useReducer(alterPage,
        {pageNum: +queryParameters.get('page') <= 0 ? 1 : +queryParameters.get('page')}
    )
    const displayLocal = recipeQuery == 'booklet';

    useEffect(() => {
        setQueryParameters({recipe: recipeQuery, page: pageQuery.pageNum});
    }, [recipeQuery, pageQuery]);

    function changePage(action) {
        setPageQuery({type: action})
    }

    return (
        <>
            {displayLocal && <LocalRecipes currentPage={pageQuery.pageNum} />}
            {!displayLocal && <SearchedRecipes recipeParam={recipeQuery} pageParam={pageQuery.pageNum} newSearch={setRecipeQuery} />}

            <button onClick={() => changePage('previousPage')}>Previous Page</button>
            <button onClick={() => changePage('nextPage')}>Next Page</button>
        </>
    )
}