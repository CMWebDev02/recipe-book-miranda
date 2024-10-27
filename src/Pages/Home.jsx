import React from "react";
import { Link } from "react-router-dom";
import { PageLinks } from "../Components/PageLinks";
import { MealInspiration } from "../Containers/MealInspiration";
import styles from '../Styles/Home.module.css'
/**
 * @component Home page of the project. Displays the basic description of the project, links to the various pages, and displays a random meal to provide the user with ideas for what to search.
 */
export function Home() {
    return (
        <div className={styles.mainPageDiv}>
            <div className={styles.heroDiv}>
                <div>
                    <h2>Welcome!</h2>
                    <p>
                        <Link to={'/discover'}>Search</Link> for any recipe you can think of and save them to your <strong><Link to={'/booklet'}>Recipe Book</Link></strong> and plan out your meals for the week with the built in <strong><Link to={'/planner'}>Meal Planner</Link></strong>.
                    </p>
                </div>
            </div>
            <MealInspiration />
        </div>
    )
}