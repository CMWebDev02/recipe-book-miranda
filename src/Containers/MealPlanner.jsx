import React, { useState, useEffect } from "react";
import { MealPlan } from "../JavaScript/localStorage";
import { DisplayRecipe } from "../Components/DisplayRecipe";


// Current plan, have the two separate lists, on the left will be the list showing what meals will be made on certain days and on the left will be all recipes saved for the meal plan that currently don't have a
// weekday property, and add a way to assign a weekday property id via a dropdown list and a add button.
export function MealPlanner() {
    const [ plannedMeals, setPlannedMeals ] = useState(MealPlan.getList())
    const [ updateOccurred, setUpdateOccurred ] = useState(false);
    const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        setPlannedMeals(MealPlan.getList());
        setUpdateOccurred(false);
    }, [updateOccurred])
    
    return (
        <div className="meal-planner">
            <div className="planned-meals">
                {/* Displays meals that have the weekday property and shows the meal under their appropriate day. */}
                {plannedMeals.filter(meal => meal.weekday).map(meal => <DisplayRecipe key={'weekday-meal-' + Math.random()} recipe={meal} viewLocation={'planner'} update={setUpdateOccurred} />)}
            </div>
            <div className="unplanned-meals">
                {/* Displays all meals that do not have the weekday property */}
                {plannedMeals.filter(meal => !meal.weekday).map(meal => <DisplayRecipe key={'weekday-meal-' + Math.random()} recipe={meal} viewLocation={'planner'} update={setUpdateOccurred} />)}
            </div>
        </div>
    )
}