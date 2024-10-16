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
    } else if (action.type == 'reset') {
        return {
            pageNum: 1
        }
    }
    throw new Error('Unknown Action')
}

export function RecipeList({ APIKey, displayLocal }) {
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    const [ recipeQuery, setRecipeQuery ] = useState(
        queryParameters.get('recipe')
    )
    const [ pageQuery, setPageQuery ] = useReducer(alterPage,
        {pageNum: (+queryParameters.get('page') <= 0 ? 1 : +queryParameters.get('page'))}
    )
    const [ showLocal, setShowLocal ] = useState(displayLocal);

    useEffect(() => {
        setQueryParameters({recipe: recipeQuery, page: pageQuery.pageNum});
    }, [recipeQuery, pageQuery]);

    useEffect(() => {
        if (displayLocal) {
            setRecipeQuery('booklet')
            setPageQuery({type: 'reset'});
            setShowLocal(true);
        } else {
            setShowLocal(false)
        }
    }, [displayLocal])

    function changePage(action) {
        window.scrollTo({top: 100});
        setPageQuery({type: action});
    }

    // Try utilizing the key property to trigger an update once DisplayLocal changes instead of relying on the current effect, and change the current set Query parameter to check if display local is true
    // if so then it should set the recipe Query to booklet, https://react.dev/learn/managing-state

    return (
        <>
            {showLocal && <LocalRecipes key={pageQuery.pageNum + Math.random()} currentPage={pageQuery.pageNum} />}
            {!showLocal && <SearchedRecipes key={pageQuery.pageNum + Math.random()} recipeParam={recipeQuery} pageParam={pageQuery.pageNum} newSearch={setRecipeQuery} APIKey={APIKey} />}

            <button onClick={() => changePage('previousPage')}>Previous Page</button>
            <button onClick={() => changePage('nextPage')}>Next Page</button>
        </>
    )
}