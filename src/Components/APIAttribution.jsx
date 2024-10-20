import React from "react";

/**
 * APIAttributions
 * @component Displays links to the various APIs used to create this project.
 */
export function APIAttributions() {
    return (
        <p>
            This project utilizes a Recipe API created by <a href="https://api-ninjas.com/">API Ninjas</a> to gather recipes and the <a href="https://fdc.nal.usda.gov/api-guide.html"> FoodData Central API</a> 
            to gather nutritional information for ingredients.
        </p>
    )
}