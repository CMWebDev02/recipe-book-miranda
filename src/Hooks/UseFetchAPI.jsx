import React, { useEffect, useState } from "react";

export function UseFetchAPI(url) {
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);
    const [ promise, setPromise ] = useState('');

    async function fetchData(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Fetch Failed');
            return await response.json();
        } catch (error) {
            console.error('UseFetchAPI:', error);
            setErrorOccurred(error.message);
        } finally {
            setIsLoading(false);
        }
    } 

    useEffect(() => {
        setPromise(fetchData(url));
    }, [url])

    return {errorOccurred, isLoading, promise}
}