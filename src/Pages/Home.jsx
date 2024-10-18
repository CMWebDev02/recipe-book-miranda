import React from "react";
import { PageLinks } from "../Components/PageLinks";
import { MealInspiration } from "../Containers/MealInspiration";
import '../Styles/DefaultStyles.css'

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