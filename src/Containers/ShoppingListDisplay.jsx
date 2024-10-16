import React from "react";
import { DisplayIngredients } from "../Components/DisplayIngredients";


export function ShoppingListDisplay({ list }) {
    return (
        <>
            {list && list.map(meal => <DisplayIngredients key={'shopping-list' + Math.random()} meal={meal} />)}
        </>
    )
}