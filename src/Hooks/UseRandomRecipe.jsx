import React, { useEffect, useState } from "react";

export function UseRandomRecipe() {
    const [ errorsOccurred, setErrorsOccurred ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true)
    const [ firstResponse, setFirstResponse ] = useState('')
    const urls = ['https://foodish-api.com/api', 'https://api.freeapi.app/api/v1/public/meals/meal/random'];

    async function getFirstResponse() {
        try {
            let allFetches = urls.map(url => {return fetch(url)})

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

    useEffect(() => {
        getFirstResponse() 
    }, [])

    return { errorsOccurred, isLoading, firstResponse }
}