import React, { useEffect, useState } from "react";

export function UseRandomRecipe() {
    const [ errorsOccurred, setErrorsOccurred ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true)
    const [ firstResponse, setFirstResponse ] = useState('')
    
    useEffect(() => {
        const urls = ['https://foodish-api.com/api', 'https://api.freeapi.app/api/v1/public/meals/meal/random'];
        const controller = new AbortController();
        const signal = controller.signal;

        const getResult = async () => {
            try {

                let allFetches = urls.map(url => {return fetch(url, {signal})})
    
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

        getResult();

        return () => {
            controller.abort();
        }
    }, [])

    return { errorsOccurred, isLoading, firstResponse }
}