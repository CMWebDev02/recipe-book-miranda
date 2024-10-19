import React, {useState} from "react";

/**
 * APIKeyTextBox
 * @component Displays a textbox and a input button to update the current state for the passed in API key string.
 * @param {Object} api - Object containing the API Key string and its setter for the API.
 * @param {string} title - String containing the API's title.
 * @param {string} APISource - URL string to the API's webpage.
 */
export function APIKeyTextBox({ api: [apiKey, setAPIKey], title, APISource }) {
    const [ userKey, setUserKey ] = useState(apiKey);

    function updateKey() {
        if (userKey == '') {
            alert('Enter a valid API Key...');
        } else if (apiKey == userKey) {
            alert('Update Failed, Key Unchanged...');
        } else {
            alert('Key Updated');
            setAPIKey(userKey);
        }
    }

    return (
        <>
            <h2><a href={APISource}>{title}</a></h2>
            <button onClick={updateKey}>Update</button>
            <input type="password" placeholder={`Enter ${title} Key...`} value={userKey} 
                    onChange={(e) => setUserKey(e.target.value)} />
        </>
    )
}