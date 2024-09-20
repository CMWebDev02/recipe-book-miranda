import React, { useState } from "react";
import { MealPlan } from "../JavaScript/localStorage";

export function MealPlan() {
    const [ plannedMeals, setPlannedMeals ] = useState(MealPlan.getList())
    
}