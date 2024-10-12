import React from "react";
import { useNavigate } from "react-router-dom";

export function GenerateButton({ containsMeals }) {
    const navigate = useNavigate()

    function handleClick() {
        if (containsMeals) {
            navigate("/planner/shoppinglist")
        } else {
            alert('Add Recipes to the Meal Planner first!');
        }
    }

    return (
        <button onClick={handleClick}>Generate Shopping List</button>
    )
}