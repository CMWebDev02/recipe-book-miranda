import React from "react";

export function DisplayImage({ recipeTitle, imageSrc }) {
    
    return (
        <>
        {/* Add alt to image and potentially make it a link to either the image SRC or the recipe online or video depending on the link source. */}
            {recipeTitle && <h1>{recipeTitle}</h1>}
            <img src={imageSrc} />
        </>
    )
}