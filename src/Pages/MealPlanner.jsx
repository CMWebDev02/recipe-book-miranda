import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom'
import { MealPlan } from "../JavaScript/localStorage";
import { DisplayRecipe } from "../Components/DisplayRecipe";
import { NutritionalInfo } from "./NutritionalInfo";
import { GenerateButton } from '../Components/GenerateButton.jsx'
import { ShoppingList } from "./ShoppingList.jsx";
import styles from '../Styles/MealPlanner.module.css'

/**
 * @component Displays a weekly planner to assign meals to on certain days. All recipes will be displayed in a separate list with the option to add them to specific weekdays.
 * User will also be able to remove these recipes from localStorage and view their nutritional info.
 * @param {string} NutritionalAPIKey - API key used to provide credentials to the FoodData Center API.
 */
export function MealPlanner({ NutritionalAPIKey }) {
    // Pulls the meal planner array from localStorage and separates all recipes saved within it.
    // Recipes can either be planned or unplanned depending on if the recipe has the weekday property already set.
    const [ plannedMeals, setPlannedMeals ] = useState([...MealPlan.getList()].filter(meal => {return meal.weekday ? true : false}));
    const [ unPlannedMeals, setUnPlannedMeals ] = useState([...MealPlan.getList()].filter(meal => !meal.weekday));

    const [ updateOccurred, setUpdateOccurred ] = useState(false);
    const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Rerenders when the updateOccurred variable changes state. Similar to the first rerender.
    // This again pulls the meal planner array from localStorage and separates all recipes saved within it.
    useEffect(() => {
        setPlannedMeals([...MealPlan.getList()].filter(meal => {return meal.weekday ? true : false}));
        setUnPlannedMeals([...MealPlan.getList()].filter(meal => !meal.weekday))
        setUpdateOccurred(false);
    }, [updateOccurred])
    
    return (
        <div className={styles.mainPageDiv}>
            <div className={styles.plannedMealsDiv}>
                <GenerateButton containsMeals={plannedMeals.length > 0 ? true : false} />
                {/* Displays meals that have the weekday property and shows the meal under their appropriate day. */}
                {weekdays.map(day => <div key={"day-" + Math.random()} className={styles.weekDayMealDiv} >
                                        <h2>{day}</h2>
                                        {plannedMeals.filter(meal => meal.weekday == day).map(meal => <DisplayRecipe key={'weekday-meal-' + Math.random()} recipe={meal} viewLocation={'planner'} update={setUpdateOccurred} /> )}
                                    </div>)}
                
            </div>
            <div className={styles.unPlannedMealsDiv}>
                <h2>Unplanned Meals:</h2>
                {/* Displays all meals that do not have the weekday property */}
                {unPlannedMeals.map(meal => <DisplayRecipe key={'weekday-meal-' + Math.random()} recipe={meal} viewLocation={'planner'} update={setUpdateOccurred} />)}
            </div>

            {/* Creates nested routes that will display modals of either a shopping list of all meals saved to the weekly planner
                    or the nutritional info for the selected recipe whose id is injected into the url. */}
            <Routes>
                <Route path="/shoppinglist" element={<ShoppingList meals={plannedMeals} />}/>
                <Route path="/:id" element={<NutritionalInfo NutritionalAPIKey={NutritionalAPIKey} />}/>
            </Routes>
        </div>
    )
}