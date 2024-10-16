import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom'
import { MealPlan } from "../JavaScript/localStorage";
import { DisplayRecipe } from "../Components/DisplayRecipe";
import { NutritionalInfo } from "./NutritionalInfo";
import { GenerateButton } from '../Components/GenerateButton.jsx'
import { ShoppingList } from "./ShoppingList.jsx";

export function MealPlanner({ nutritionalAPIKey }) {
    const [ plannedMeals, setPlannedMeals ] = useState([])
    const [ unPlannedMeals, setUnPlannedMeals ] = useState([])
    const [ updateOccurred, setUpdateOccurred ] = useState(false);
    const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {        
        setPlannedMeals([...MealPlan.getList()].filter(meal => {return meal.weekday ? true : false}));
        setUnPlannedMeals([...MealPlan.getList()].filter(meal => !meal.weekday))
        setUpdateOccurred(false);
    }, [])

    useEffect(() => {
        setPlannedMeals([...MealPlan.getList()].filter(meal => {return meal.weekday ? true : false}));
        setUnPlannedMeals([...MealPlan.getList()].filter(meal => !meal.weekday))
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
            <GenerateButton containsMeals={plannedMeals.length > 0 ? true : false} />
            <hr />
            <div className="unplanned-meals">
                {/* Displays all meals that do not have the weekday property */}
                {unPlannedMeals.map(meal => <DisplayRecipe key={'weekday-meal-' + Math.random()} recipe={meal} viewLocation={'planner'} update={setUpdateOccurred} />)}
            </div>

            <Routes>
                <Route path="/shoppinglist" element={<ShoppingList meals={plannedMeals} />}/>
                <Route path="/:id" element={<NutritionalInfo nutritionalAPIKey={nutritionalAPIKey} recipes={plannedMeals} />}/>
            </Routes>
        </div>
    )
}