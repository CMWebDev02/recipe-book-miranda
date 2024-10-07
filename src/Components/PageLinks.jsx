import React from "react";
import { Link } from "react-router-dom";

export function PageLinks() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/discover">Discover</Link>
            <Link to="/booklet">Recipe Book</Link> 
            <Link to="/planner">Meal Plan</Link> 
        </>
    )
}