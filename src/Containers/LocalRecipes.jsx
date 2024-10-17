import React, { useEffect, useState } from "react";
import { SavedRecipes } from "../JavaScript/localStorage";
import { DisplayRecipe } from "../Components/DisplayRecipe";

export function LocalRecipes({ currentPage, disableNextPage }) {
    const [ allRecipes, setAllRecipes ] = useState(SavedRecipes.getList());
    const [ containsRecipes, setContainsRecipes ] = useState(false);
    const [ updateOccurred, setUpdateOccurred ] = useState(false);

    useEffect(() => {
        let startIndex = (currentPage - 1) * 10;
        let localRecipes = SavedRecipes.getList().slice(startIndex, startIndex + 10)
        setContainsRecipes(localRecipes.length > 0 ? true : false);
        disableNextPage(localRecipes.length > 0 ? false : true);
        setAllRecipes(localRecipes);
        setUpdateOccurred(false);
    }, [updateOccurred, currentPage])

    return (
        <>
            {!containsRecipes && <h1>{currentPage == 1 ? 'No Recipes Saved To Recipe Book' : 'No More Recipes To Display'}</h1>}
            {allRecipes.map(recipe => <DisplayRecipe key={"local-recipe-" + Math.random()}
                                        recipe={recipe} viewLocation={'stored'} 
                                        update={setUpdateOccurred} />)}
        </>
    )
}