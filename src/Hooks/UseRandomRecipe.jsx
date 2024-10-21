import React, { useEffect, useState } from "react";

/**
 * @hook Returns a random recipe object. The object can come from multiple APIs, the one that is returned is the one whose fetch call resolves their promise first.
 */
export function UseRandomRecipe() {
    const [ errorsOccurred, setErrorsOccurred ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true)
    const [ firstResponse, setFirstResponse ] = useState('')
    
    useEffect(() => {
        // All urls listed in this array will have a fetch call created and which ever resolves first will be returned to the user.
        const urls = ['https://foodish-api.com/api', 'https://api.freeapi.app/api/v1/public/meals/meal/random'];
        const controller = new AbortController();
        const signal = controller.signal;

        // getResult is initialized within the useEffect to provide easier access to the abortcontroller without needing to pass in additional arguments.
        const getResult = async () => {
            try {
                let allFetches = urls.map(url => {return fetch(url, {signal})})
    
                // Promise.any is used to return the first to resolve promise.  
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