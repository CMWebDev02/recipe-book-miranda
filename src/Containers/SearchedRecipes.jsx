import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useRecipeAPI} from '../Hooks/useRecipeAPI'
import { DisplayRecipe } from "../Components/DisplayRecipe";
import { SearchBox } from "../Components/SearchBox";

export function SearchedRecipes({ recipeParam, pageParam }) {
    const changeSearch = useNavigate()
    const [ newSearch, setNewSearch ] = useState('');
    const { errorOccurred, allRecipes, isLoading } = useRecipeAPI(recipeParam, pageParam);

    function showNewSearch() {
        changeSearch('/recipelist/' + newSearch + '/1')
    }

    return (
        <div className="recipes-display">
            <h1>Showing Results for {recipeParam}</h1>
            <div className="new-search">
                <h3>Find New Recipe</h3>
                <SearchBox searchResult={newSearch} updateSearch={setNewSearch} redirectToList={showNewSearch} />
            </div>
            <div className="recipes-list">
                {errorOccurred && <h1>{errorOccurred}</h1>}
                {isLoading && <h1>Loading...</h1>}
                {allRecipes && allRecipes.map(recipe => <DisplayRecipe key={"recipe-" + Math.random()} 
                                                            recipe={recipe} localRecipe={false} />)}
            </div>
        </div>
    )
}