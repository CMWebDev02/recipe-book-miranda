import React from "react"
import { DisplayRecipe } from "./DisplayRecipe.jsx"

export function WeekDayMeals({ weekDayMeals }) {

    return (
        <div className="weekday-meals">
            {weekDayMeals.map(meal => <DisplayRecipe key={'weekday-meal-' + Math.random()} recipe={meal} />)}
        </div>
    )
}