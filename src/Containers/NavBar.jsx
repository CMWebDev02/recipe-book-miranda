import React, { useState } from "react";
import { APIKeyTextBox } from "../Components/APIKeyTextBox";
import { PageLinks } from "../Components/PageLinks";
import style from '../Styles/NavBar.module.css';

/**
 * @component Navigation Bar For the Web Page. It displays the various links to access the different pages in the project and provides two textboxes for the user to enter their API keys.
 * @param {Object} RecipesAPI - Object containing the API Key string and its setter for the Ninja Recipe API.
 * @param {Object} NutritionalAPI - Object containing the API Key string and its setter for the FoodData Central API.
 */
export function NavBar({RecipesAPI, NutritionalAPI}) {

    return (
        <div className={style.mainDiv}>            
            <h1>Recipe Book Project</h1>
            <PageLinks />
            <div className={style.apisDiv}>
                {/* APIKeyTextBox component for the Ninja Recipes API */}
                <APIKeyTextBox api={RecipesAPI} title={'Recipes API'} APISource={'https://api-ninjas.com/'} />
                {/* APIKeyTextBox component for the FoodData Central API */}
                <APIKeyTextBox api={NutritionalAPI} title={'Nutritional API'} APISource={'https://fdc.nal.usda.gov/api-guide.html'} />
            </div>
        </div>
    )
}