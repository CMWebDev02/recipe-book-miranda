import React, { useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { SearchedRecipes } from "../Containers/SearchedRecipes";
import { LocalRecipes } from "../Containers/LocalRecipes";

/**
 * RecipeList
 * @component Renders a list of recipes, either the recipes resulting from the API fetch call or the recipes saved locally. 10 Recipes are displayed per page.
 * @param {string} APIKey - String variable of the user's APIKey to provide credentials when making a fetch call.
 * @param {boolean} displayLocal - Boolean value to represent if the user should be displaying the LocalRecipes Component or the SearchedRecipes Component.
 */
export function RecipeList({ APIKey, displayLocal }) {
    // Defines set state for several variables.
    // First stores the query parameters that will be injected into the url.
    // Second stores the recipe query entered by the user.
    // Third stores the page query entered by the user.
    // Fourth stores a showLocal boolean that determines if the LocalRecipes Component will be displayed or the SearchedRecipes Component.
    // Fifth stores the isButtonDisabled boolean that determines if the next page button will be displayed.
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    const [ recipeQuery, setRecipeQuery ] = useState(
        queryParameters.get('recipe')
    )
    const [ pageQuery, setPageQuery ] = useReducer(alterPage,
        {pageNum: (+queryParameters.get('page') <= 0 ? 1 : +queryParameters.get('page'))}
    )
    const [ showLocal, setShowLocal ] = useState(displayLocal);
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);

    /**
     * newSearch
     * @function Updates the query parameters of the recipeQuery and pageQuery state variables.
     * @param {string} userSearch - String value of the user's new search query.
     */
    function newSearch(userSearch) {
        setPageQuery({type: 'reset'});
        setRecipeQuery(userSearch);
    }

    /**
     * alterPage
     * @function Updates the pageQuery depending on the action value passed in.
     * @param {object} state - Current state object containing the current values of the pageQuery variable.
     * @param {object} action - Object containing the type of action that will be performed on the current state of the pageQuery variable.
     */
    function alterPage(state, action) {
        // Checks the action's type property.
        if (action.type == 'nextPage') {
            // If the action is to change to the next page,
            // return a new object with the pageNum's variable previous value incremented by one.
            return {
                pageNum: state.pageNum + 1            
            }
        } else if (action.type == 'previousPage') {
            // If the action is to change to the previous page,
            // return a new object with the pageNum's variable previous value decremented by one.
            return {
                pageNum: (state.pageNum - 1 < 1 || state.pageNum <= 0 ? 1 : state.pageNum - 1)
            }
        } else if (action.type == 'reset') {
            // If the action is to change to the reset the page's value,
            // return a new object with the pageNum's variable set equal to 1.
            return {
                pageNum: 1
            }
        }
        // Throws a new error if the action.type is unrecognized.
        throw new Error('Unknown Action')
    }

    /**
     * changePage
     * @function Changes the page and scrolls to the top of the page.
     * @param {string} action - String value that will denote which action will occur to the pageQuery variable.
     */
    function changePage(action) {
        // Scrolls the current window to the top of the page.
        window.scrollTo({top: 100});
        // Calls the setPageQuery to update the current state value of the pageQuery state variable depending on the value of the action variable passed in.
        setPageQuery({type: action});
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