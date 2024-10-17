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
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);

    function newSearch(userSearch) {
        setPageQuery({type: 'reset'});
        setRecipeQuery(userSearch);
    }

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

    return (
        <>
            {showLocal && <LocalRecipes key={pageQuery.pageNum + Math.random()} currentPage={pageQuery.pageNum} disableNextPage={setIsButtonDisabled} />}
            {!showLocal && <SearchedRecipes key={pageQuery.pageNum + Math.random()} disableNextPage={setIsButtonDisabled} 
                                    recipeParam={recipeQuery} pageParam={pageQuery.pageNum} newSearch={newSearch} APIKey={APIKey} />}

            <button disabled={pageQuery.pageNum == 1 ? true : false} onClick={() => changePage('previousPage')}>Previous Page</button>
            <button disabled={isButtonDisabled} onClick={() => changePage('nextPage')}>Next Page</button>
        </>
    )
}