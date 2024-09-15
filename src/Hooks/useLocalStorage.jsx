import React, { useEffect, useState } from "react";
import { SavedRecipes } from "../JavaScript/localStorage";
import { useReducer } from "react";

export function useLocalStorage() {
    const [ allRecipes, setAllRecipes ] = useState(SavedRecipes.getRecipeBook());
    const [ changeOccurred, setChangeOccurred ] = useState(false);

    useEffect(() => {
        setChangeOccurred(false);
        setAllRecipes(SavedRecipes.getRecipeBook());
    }, [changeOccurred])


    return { allRecipes, editOptions: {setChangeOccurred, SavedRecipes.storeRecipe, SavedRecipes.removeRecipe} }
}