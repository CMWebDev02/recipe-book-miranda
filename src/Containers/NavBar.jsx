import React, { useState } from "react";
import { APIKeyTextBox } from "../Components/APIKeyTextBox";
import { PageLinks } from "../Components/PageLinks";

/**
 * NavBar
 * @component Navigation Bar For the Web Page
 * @param {Object} RecipesAPI - Object containing the API Key string and its setter for the Ninja Recipe API.
 * @param {Object} NutritionalAPI - Object containing the API Key string and its setter for the FoodData Central API.
 */
export function NavBar({RecipesAPI, NutritionalAPI}) {

    return (
        <>
            <div className="page-links">
                <h1>Recipe Book Project</h1>
                <PageLinks />
            </div>
            <div className="user-key">
                {/* APIKeyTextBox component for the Ninja Recipes API */}
                <APIKeyTextBox api={RecipesAPI} title={'Recipes API'} APISource={'https://api-ninjas.com/'} />
                {/* APIKeyTextBox component for the FoodData Central API */}
                <APIKeyTextBox api={NutritionalAPI} title={'Nutritional API'} APISource={'https://fdc.nal.usda.gov/api-guide.html'} />
            </div>
        </>
    )
}