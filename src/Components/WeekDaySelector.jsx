import React, { useState } from "react";
import { MealPlan } from "../JavaScript/localStorage";

export function WeekDaySelector({ recipe, update }) {
    const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [ selectedDay, setSelectedDay ] = useState('Sunday');

    function setWeekDay(action) {
        MealPlan.updateRecipe(action, selectedDay, recipe.id);
        update(true);
    }

    if (!recipe.weekday) {
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
            <>
                <button onClick={() => setWeekDay('remove')}>Move Back</button>
            </>
        )
    }
}