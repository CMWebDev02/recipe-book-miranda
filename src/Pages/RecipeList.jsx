import React, { useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { SearchedRecipes } from "../Containers/SearchedRecipes.jsx";
import { LocalRecipes } from "../Containers/LocalRecipes.jsx";
import styles from '../Styles/RecipeList.module.css'

/**
 * @component Renders a list of recipes, either the recipes resulting from the API fetch call or the recipes saved locally. 10 Recipes are displayed per page.
 * Searched Recipes and Local recipes share this same base component to allow for reusing the page features present to make navigation similar between the two and so that a recipe whether saved locally or search is displayed
 * in the same manner.
 * @param {string} APIKey - String variable of the user's APIKey to provide credentials when making a fetch call.
 * @param {boolean} displayLocal - Boolean value to represent if the user should be displaying the LocalRecipes Component or the SearchedRecipes Component.
 */
export function RecipeList({ APIKey, displayLocal }) {    
    // Stores the query parameters that will be injected into the url.
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    // Stores the recipe query as a string.
    const [ recipeQuery, setRecipeQuery ] = useState(
        queryParameters.get('recipe')
    )
    // Stores the page query as a number.
    const [ pageQuery, setPageQuery ] = useReducer(alterPage,
        {pageNum: (+queryParameters.get('page') <= 0 ? 1 : +queryParameters.get('page'))}
    )
    // Stores a boolean that determines if the next page button will be displayed.
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);

    /**
     * @function Updates the query parameters of the recipeQuery state variable and resets the pageQuery state variable back to 1.
     * @param {string} userSearch - String value of the user's new search query.
     */
    function newSearch(userSearch) {
        setPageQuery({type: 'reset'});
        setRecipeQuery(userSearch);
    }

    /**
     * @function Updates the pageQuery depending on the action value passed in.
     * @param {object} state - Current state object containing the current values of the pageQuery variable.
     * @param {object} action - Object containing the type of action that will be performed on the current state of the pageQuery variable.
     */
    function alterPage(state, action) {
        // For all return statements, a new object is returned that contains the pageNum variable.
        // Depending on the action passed in, this variable is either incremented or decremented by one, oe set to zero.
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
        // Throws a new error if the action.type is unrecognized.
        throw new Error('Unknown Action')
    }

    /**
     * @function Alters the page based on the passed in argument and scrolls to the top of the page.
     * Also, resets the boolean controlling if the next page button is disabled regardless of its previous states before the function call.
     * @param {string} action - String value that will denote which action will occur to the pageQuery variable.
     */
    function changePage(action) {
        window.scrollTo({top: 100});
        setPageQuery({type: action});
        setIsButtonDisabled(false)
    }

    // Rerenders each time the recipeQuery or pageQuery state changes.
    useEffect(() => {
        // Updates the query parameters injected in the url of the webpage when a state change occurs for the recipeQuery or pageQuery variables.
        setQueryParameters({recipe: recipeQuery, page: pageQuery.pageNum});
    }, [recipeQuery, pageQuery, setQueryParameters]);

    // Rerenders if the passed in displayLocalArgument changes.
    useEffect(() => {
        // Checks if the recipes to be displayed are locallySaved based on the value of the displayLocal boolean argument passed in.
        if (displayLocal) {
            // Sets the recipeQuery state to 'booklet' to denote that local recipes are being displayed and resets the page count.
            setRecipeQuery('booklet')
            setPageQuery({type: 'reset'});
        }
    }, [displayLocal])

    return (
        <div className={styles.mainDisplayDiv}>
            {/* Displays all locallySaved recipes via the LocalRecipes Component and passes the state setter for the isButtonDisabled boolean and the value of the pageQuery variable. */}
            {displayLocal && <LocalRecipes key={pageQuery.pageNum + Math.random()} currentPage={pageQuery.pageNum} disableNextPage={setIsButtonDisabled} />}

            {/* Displays all results from the Recipe API via the SearchedRecipes Component and passes the state setter for the isButtonDisabled boolean,
                    the value of the pageQuery, recipeQuery, and APIKey variable,
                        and the function to update the search parameters. */}
            {!displayLocal && <SearchedRecipes key={pageQuery.pageNum + Math.random()} disableNextPage={setIsButtonDisabled} 
                                    recipeParam={recipeQuery} pageParam={pageQuery.pageNum} APIKey={APIKey} newSearch={newSearch} />}

            {/* Updates the current pageQuery value depending on the button pressed. */}
            <div className={styles.pageButtonsDiv}>
                <button disabled={pageQuery.pageNum == 1 ? true : false} onClick={() => changePage('previousPage')}>Previous Page</button>
                <button disabled={isButtonDisabled} onClick={() => changePage('nextPage')}>Next Page</button>
            </div>
        </div>
    )
}