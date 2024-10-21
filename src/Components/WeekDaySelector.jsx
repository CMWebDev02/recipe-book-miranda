import React, { useState } from "react";
import { MealPlan } from "../JavaScript/localStorage";

/**
 * @component Displays a selector element and button that will set the passed in recipe's weekday property.
 * @param {object} recipe - Recipe object containing all of the recipe's information that will be displayed.
 * @param {object} update - State setter that updates a boolean to show if the localStorage array was altered.
 */
export function WeekDaySelector({ recipe, update }) {
    const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Stores the day selected for the recipe.
    const [ selectedDay, setSelectedDay ] = useState('Sunday');

    /**
     * @function Updates the recipe in localStorage with the new weekday value selected by the user, and alerts the grandparent component to rerender the recipe list.
     * @param {string} action - Denotes how to update the recipe's weekday property, either removing it or setting it.
     */
    function setWeekDay(action) {
        // Calls the updateRecipe method to update the recipe store in the localStorage array and calls the method to trigger a reload in the grandparent component.
        MealPlan.updateRecipe(action, selectedDay, recipe.id);
        update(true);
    }


    if (!recipe.weekday) {
        // If the recipe does not have a weekday property, the component returns the means to set the weekday property.
        return (
            <>
                <select onInput={(e) => setSelectedDay(e.target.value)} value={selectedDay} name="weekday">
                    {weekdays.map(day => <option key={'weekday-' + Math.random()} value={day}>{day}</option>)}
                </select>
                <button onClick={() => setWeekDay('add')}>Add To {selectedDay}</button>
            </>
        )
    } else {
        return (
            // If the recipe already has a weekday property, the component returns the means to remove the weekday property.
            <>
                <button onClick={() => setWeekDay('remove')}>Move Back</button>
            </>
        )
    }
}