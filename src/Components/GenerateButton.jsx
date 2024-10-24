import React from "react";
import { useNavigate } from "react-router-dom";
import styles from '../Styles/MealPlanner.module.css'

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
        <button onClick={handleClick} className={styles.shoppingListButton}>Generate Shopping List</button>
    )
}