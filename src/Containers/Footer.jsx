import React, { useEffect, useState } from "react";
import { NutritionalDB } from "../JavaScript/NutrientDataBase";
import { APIAttributions } from "../Components/APIAttribution";

/**
 * Footer
 * @component Displays a footer at the bottom of the page containing the API Attributions and a button to clear all caches.
 */
export function Footer() {

    /**
     * clearDataBase
     * @function Clears all stored nutrient data after receiving confirmation from the user.
     */
    function clearDataBase() {
        // Provides a modal for the user, confirming will result in a true boolean and declining will result in a false boolean.
        let choice = confirm('Warning! This action is not reversible and will remove all locally saved nutritional info.')
        // Checks if the value of the user's choice is false and if so, the function ceases execution.
        if (!choice) return;

        // Declares a try statement.
        try {
            // Initializes a new database object that links to the indexDB database for nutritional info.
            let database = new NutritionalDB() 
            // Calls the clear method on the indexDB to clear all objectStores and the values within them.
            database.clearDataBase();
            // Reloads the user's current window to ensure that the indexDB database was properly removed.
            window.location.reload()
        } catch (error) {
            // Catches any error and logs it to the console.
            console.error(error);
        }
    }

    return (
        <footer>
            <APIAttributions />
            <button onClick={clearDataBase}>Clear Cache</button>
        </footer>
    )
}