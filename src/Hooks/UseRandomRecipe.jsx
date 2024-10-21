import React, { useEffect, useState } from "react";

/**
 * @hook Returns a random recipe object. The object can come from multiple APIs, the one that is returned is the one whose fetch call's returned promise is successfully fulfilled first.
 */
export function UseRandomRecipe() {
    const [ errorsOccurred, setErrorsOccurred ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true)
    const [ firstResponse, setFirstResponse ] = useState('')
    
    useEffect(() => {
        // All urls listed in this array will have a fetch call created and which ever resolves first will be returned to the user.
        const apisArray = ['https://foodish-api.com/api', 'https://api.freeapi.app/api/v1/public/meals/meal/random'];
        const controller = new AbortController();
        const signal = controller.signal;
        // getResult is initialized within the useEffect to provide easier access to the abortcontroller without needing to pass in additional arguments.

        /**
         * @function Initializes fetch calls to all urls within the apisArray and whose ever promise is fulfilled first, is returned by the hook along with any errors that may occur. 
         */
        const getResult = async () => {
            try {
                let allFetches = apisArray.map(url => {return fetch(url, {signal})})
    
                // Promise.any is used to return the first to have a fulfilled promise.  
                let response = await Promise.any(allFetches);
                if (!response.ok) throw new Error('All Fetches Failed')
                let data = await response.json();
                setFirstResponse(data);
            } catch (error) {
                console.error(error);
                setErrorsOccurred(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        // A call is made to the asynchronous function since the useEffect function is not asynchronous by default.
        getResult();

        return () => {
            controller.abort();
        }
    }, [])

    return { errorsOccurred, isLoading, firstResponse }
}