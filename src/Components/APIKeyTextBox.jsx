import React, {useState} from "react";

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