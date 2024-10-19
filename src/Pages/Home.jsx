import React from "react";
import { PageLinks } from "../Components/PageLinks";
import { MealInspiration } from "../Containers/MealInspiration";
import '../Styles/DefaultStyles.css'

/**
 * Home
 * @component Home page of the project. Displays the basic description of the project and displays a random meal to provide ideas to the user as to what to search.
 */
export function Home() {
    return (
        <div className="defaultColors">
            <h1>Welcome!</h1>
            {/* Describes the project's use case. */}
            <p>
                Find any recipe you can think of and save them to your <strong>Recipe Book</strong> and<br />
                plan out your meals for the week with the build in <strong>Meal Planner</strong>.
            </p>
            <PageLinks />
            <hr />
            {/* Displays a random type of meal to give the user an idea of what to search for. */}
            <h1>Maybe Try...</h1>
            <MealInspiration />
        </div>
    )
}