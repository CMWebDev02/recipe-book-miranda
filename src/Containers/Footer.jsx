import React, { useEffect, useState } from "react";
import { NutritionalDB } from "../JavaScript/NutrientDataBase.js";
import { APIAttributions } from "../Components/APIAttribution.jsx";
import styles from '../Styles/MainPage.module.css'

/**
 * @component Displays a footer at the bottom of the page containing the API Attributions and a button to clear all caches.
 */
export function Footer() {

    /**
     * @function Clears all stored nutrient data after receiving confirmation from the user.
     */
    function clearDataBase() {
        let choice = confirm('Warning! This action is not reversible and will remove all locally saved nutritional info.')
        if (!choice) return;

        try {
            // Initializes a new database object that links to the indexDB database for nutritional info.
            let database = new NutritionalDB() 
            // Calls the clear method on the indexDB to clear all objectStores and the values within them.
            database.clearDataBase();
            // Reloads the user's current window to ensure that the indexDB database was properly removed.
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <footer className={styles.footerContainer}>
            <APIAttributions />
            <button onClick={clearDataBase}>Clear Cache</button>
        </footer>
    )
}