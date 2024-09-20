import React, { useState } from "react";
import { MealPlan } from "../JavaScript/localStorage";
import { DisplayRecipe } from "../Components/DisplayRecipe";


// Current plan, have the two separate lists, on the left will be the list showing what meals will be made on certain days and on the left will be all recipes saved for the meal plan that currently don't have a
// weekday property, and add a way to assign a weekday property id via a dropdown list and a add button.
export function MealPlanner() {
    const [ plannedMeals, setPlannedMeals ] = useState(MealPlan.getList())
    
    return (
        <div className="planned-meals">
            {plannedMeals.map(meal => <DisplayRecipe key={'weekday-meal-' + Math.random()} recipe={meal} />)}
        </div>
    )
}