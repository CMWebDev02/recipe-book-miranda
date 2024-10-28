import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from '../Styles/Home.module.css'

/**
 * @component Displays the title and image of the recipeObject passed in. Depending on where the recipe is obtained from, different properties are utilized to store the image src and title so a check is made on the object
 * so that the appropriate properties are accessed on the object. The title for the recipe is handled by a web worker to make all titles passed by the different APIs similar.
 * @param {Object} recipeObject - Recipe Object containing a image of the recipe and the title of the recipe.
 */
export function DisplayImage({ recipeObject }) {
    const [ titleWorker, setTitleWorker ] = useState('');
    const [ recipeTitle, setRecipeTitle ] = useState('');
    const [ recipeSRC, setRecipeSRC ] = useState('')

    // Rerenders each time the recipeObject changes. 
    // This handles the recipe Object if a titleWorker is initialized in the components state and depending on the recipeObject's origin, certain properties are checked to see where it 
    // originated from, the image and titled are generated in different ways so the check is made to handle the object appropriately.
    useEffect(() => {
        if (titleWorker) {
            if (recipeObject.image) {
                // The image property is the src for the recipe but title property for the image is provided,
                // to obtain a title the src of the image is passed to the web worker, and a boolean is used to denote that an src is being passed, and the worker will take the last describing
                // word of the image and utilize it as the title.
                setRecipeSRC(recipeObject.image);
                titleWorker.postMessage({command: 'convertToTitle', imageString: recipeObject.image, srcBool: true})
            } else if(recipeObject.data) {
                // Additional information is sent with this recipeObject but in this case all that matters is the recipe's data.
                let data = recipeObject.data;

                // The src is stored separately in this recipeObject and it provides a title as well, the title is passed in without the srcBool being flagged so that the title is converted
                // without calling the function to convert from an src to title.
                setRecipeSRC(data.strMealThumb);
                titleWorker.postMessage({command: 'convertToTitle', imageString: data.strMeal, srcBool: false})
            }
        }
    }, [recipeObject, titleWorker])

    // Initializes a titleWorker to be stored in state each time the component initially loads.
    useEffect(() => {
        // The worker file is used across the project but commands are used to access the needed functions.
        const worker = new Worker(new URL('../JavaScript/WebWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            if (data.command == 'convertToTitle') {
                setRecipeTitle(data.imageTitle);
            }
        })

        setTitleWorker(worker)

        return () => {
            worker.terminate;
        }
    }, [])

    return (
        <>
            {recipeTitle != '' && recipeTitle != 'Idly' ? <h2>Maybe Try... {recipeTitle}</h2> : <h2>Search For Any Recipe You Can Think Of!!!</h2>}
            {recipeSRC && <Link className={styles.mealImageLink} to={recipeTitle != '' && recipeTitle != 'Idly' ? `/recipelist?recipe=${recipeTitle}&page=1` : '/discover'}><img src={recipeSRC} alt={recipeTitle} /></Link>}
            
        </>
    )
}