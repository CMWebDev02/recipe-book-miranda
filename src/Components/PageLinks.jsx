import React from "react";
import { Link } from "react-router-dom";

/**
 * @component Displays all quick links to the various pages.
 */
export function PageLinks() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/discover">Discover</Link>
            <Link to="/booklet">Recipe Book</Link> 
            <Link to="/planner">Meal Planner</Link> 
        </div>
    )
}