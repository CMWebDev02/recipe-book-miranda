import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom'
import { MealPlan } from "../JavaScript/localStorage";
import { DisplayRecipe } from "../Components/DisplayRecipe";
import { NutritionalInfo } from "../Containers/NutritionalInfo";

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
                {weekdays.map(day => <div key={"day-" + Math.random()}>
                                    <h1 >{day}</h1>
                                    {plannedMeals.filter(meal => meal.weekday == day).map(meal => <DisplayRecipe key={'weekday-meal-' + Math.random()} recipe={meal} viewLocation={'planner'} update={setUpdateOccurred} /> )}
                                    <hr />
                                    </div>)}
                
            </div>
            <hr />
            <div className="unplanned-meals">
                {/* Displays all meals that do not have the weekday property */}
                {plannedMeals.filter(meal => !meal.weekday).map(meal => <DisplayRecipe key={'weekday-meal-' + Math.random()} recipe={meal} viewLocation={'planner'} update={setUpdateOccurred} />)}
            </div>

            <Routes>
                <Route path="/:id" element={<NutritionalInfo recipes={plannedMeals} />}/>
            </Routes>
        </div>
    )
}