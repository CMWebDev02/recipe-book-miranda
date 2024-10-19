import React from "react";
import { Link } from "react-router-dom";

/**
 * PageLinks
 * @component Displays all of the quick links to the various pages.
 */
export function PageLinks() {
    return (
        <>
            {/* Uses Link components to change the user's current window location to the appropriate location. */}
            <Link to="/">Home</Link>
            <Link to="/discover">Discover</Link>
            <Link to="/booklet">Recipe Book</Link> 
            <Link to="/planner">Meal Plan</Link> 
        </>
    )
}