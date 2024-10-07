import React, { useEffect, useState } from "react";

export function UseFetchAPI({ url }) {
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);
    const [ imagePromise, setImagePromise ] = useState('');

    useEffect(() => {
        const foodishURL = url;
        let promise = fetch(foodishURL, {method:'GET'});

        setImagePromise(promise);
    }, [url])

    return {errorOccurred, isLoading, promise}
}