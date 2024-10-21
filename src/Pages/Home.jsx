import React from "react";
import { PageLinks } from "../Components/PageLinks";
import { MealInspiration } from "../Containers/MealInspiration";
import '../Styles/DefaultStyles.css'

/**
 * @component Home page of the project. Displays the basic description of the project, links to the various pages, and displays a random meal to provide the user with ideas for what to search.
 */
export function Home() {
    return (
        <div className="defaultColors">
            <h1>Welcome!</h1>
            <p>
                Find any recipe you can think of and save them to your <strong>Recipe Book</strong> and<br />
                plan out your meals for the week with the build in <strong>Meal Planner</strong>.
            </p>
            <PageLinks />
            <hr />
            <h1>Maybe Try...</h1>
            <MealInspiration />
        </div>
    )
}