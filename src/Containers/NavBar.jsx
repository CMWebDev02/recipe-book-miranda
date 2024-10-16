import React, { useState } from "react";
import { APIKeyTextBox } from "../Components/APIKeyTextBox";
import { PageLinks } from "../Components/PageLinks";

export function NavBar({RecipesAPI, nutritionalAPI}) {

    return (
        <>
            <div className="page-links">
                <h1>Recipe Book Project</h1>
                <PageLinks />
            </div>
            <div className="user-key">
                <APIKeyTextBox api={RecipesAPI} title={'Recipes API'} APISource={'https://api-ninjas.com/'} />
                <APIKeyTextBox api={nutritionalAPI} title={'Nutritional API'} APISource={'https://fdc.nal.usda.gov/api-guide.html'} />

            </div>
        </>
    )
}