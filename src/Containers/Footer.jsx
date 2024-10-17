import React, { useEffect, useState } from "react";
import { NutritionalDB } from "../JavaScript/NutrientDataBase";
import { APIAttributions } from "../Components/APIAttribution";

export function Footer() {

    async function clearDataBase() {
        let choice = confirm('Warning! This action is not reversible and will remove all locally saved nutritional info.')
        if (!choice) return;
        try {
            let database = new NutritionalDB() 
            let isConnected = await database.openDataBaseConnection()
            if (!isConnected) throw new Error('Failed to clear cache!')
            let response = await database.clearDataBase();
            console.log(response)
            if (!response.ok) throw new Error(response.error);
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