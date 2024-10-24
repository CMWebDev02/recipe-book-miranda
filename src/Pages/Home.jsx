import React from "react";
import { PageLinks } from "../Components/PageLinks";
import { MealInspiration } from "../Containers/MealInspiration";
import styles from '../Styles/Home.module.css'
/**
 * @component Home page of the project. Displays the basic description of the project, links to the various pages, and displays a random meal to provide the user with ideas for what to search.
 */
export function Home() {
    return (
        <div className={styles.mainPageDiv}>
            <div>
                <h1>Welcome!</h1>
                <div>
                    <p>
                        Find any recipe you can think of and save them to your <strong>Recipe Book</strong> and plan out your meals for the week with the build in <strong>Meal Planner</strong>.
                    </p>
                    <PageLinks />
                </div>
            </div>
            <MealInspiration />
        </div>
    )
}