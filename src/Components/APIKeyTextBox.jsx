import React, {useState} from "react";
import styles from '../Styles/MainPage.module.css'

/**
 * @component Displays a textbox and a input button to update the current state for the passed in API key string and provides a link to the webpage to obtain an APIkey.
 * @param {Object} api - Object containing the API Key string and its setter for the API, deconstruction is used to first obtain the string followed by the setter function which is used to update the state of the grandparent component.
 * @param {string} title - String containing the API's title.
 * @param {string} APISource - URL string to the API's webpage.
 */
export function APIKeyTextBox({ api: [apiKey, setAPIKey], title, APISource }) {
    const [ userKey, setUserKey ] = useState(apiKey);

    /**
     * @function Updates the current API key's state in the grandparent component as long as it is not an empty string or the same as the previous value. 
     */
    function updateKey() {
        // A check is made to see if the user is attempting to set an empty string or performed no changes to the current string, in these cases an alert to the user is made.
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
        <div className={styles.APIKeyDiv}>
            <h2><a href={APISource}>{title}</a></h2>
            <button onClick={updateKey}>Update</button>
            <input type="password" placeholder={`Enter ${title} Key...`} value={userKey} 
                    onChange={(e) => setUserKey(e.target.value)} />
        </div>
    )
}