import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function DisplayImage({ recipeObject }) {
    const [ titleWorker, setTitleWorker ] = useState('');
    const [ recipeTitle, setRecipeTitle ] = useState('');
    const [ recipeSRC, setRecipeSRC ] = useState('')

    function handleRecipeObject() {
        if (recipeObject.image) {
            setRecipeSRC(recipeObject.image);
            titleWorker.postMessage({command: 'convertToTitle', imageString: recipeObject.image, srcBool: true})
        } else {
            let data = recipeObject.data;

            setRecipeSRC(data.strMealThumb);
            titleWorker.postMessage({command: 'convertToTitle', imageString: data.strMeal, srcBool: false})
        }
    }

    useEffect(() => {
        if (titleWorker) {
            handleRecipeObject()
        }
    }, [recipeObject])

    useEffect(() => {
        const worker = new Worker(new URL('../JavaScript/WebWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            if (data.command == 'convertToTitle')
                console.log(data.imageTitle)
            setRecipeTitle(data.imageTitle);
        })

        setTitleWorker(worker)

        return () => {
            worker.terminate;
        }
    }, [])

    return (
        <>
        {/* Make the image link to either the image SRC or the recipe online or video depending on the link source. */}
            <h2>{recipeTitle}</h2>
            <Link to={`/recipelist?recipe=${recipeTitle}&page=1`}><img src={recipeSRC} alt={recipeTitle} /></Link>
            
        </>
    )
}