import React, { useState } from "react";
import { Link } from "react-router-dom";
import { APIKeyTextBox } from "../Components/APIKeyTextBox";

export function NavBar({RecipesAPI, nutritionalAPI}) {

    return (
        <>
            <div className="page-links">
                <h1>Recipe Book Project</h1>
                <Link to="/">Home</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/booklet">Recipe Book</Link> 
                <Link to="/planner">Meal Plan</Link> 
            </div>
            <div className="user-key">
                <APIKeyTextBox api={RecipesAPI} title={'Recipes API'} />
                <APIKeyTextBox api={nutritionalAPI} title={'Nutritional API'} />

            </div>
        </>
    )
}