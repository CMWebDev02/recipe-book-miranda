import React, { useEffect, useState } from "react";
import { NutritionalDB } from "../JavaScript/NutrientDataBase";
import { APIAttributions } from "../Components/APIAttribution";

export function Footer() {

    function clearDataBase() {
        let choice = confirm('Warning! This action is not reversible and will remove all locally saved nutritional info.')
        if (!choice) return;
        try {
            let database = new NutritionalDB() 
            database.clearDataBase();
            window.location.reload()
        } catch (error) {
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