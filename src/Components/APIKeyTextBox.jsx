import React, {useState} from "react";

export function APIKeyTextBox({ api: [apiKey, setAPIKey], title }) {
    const [ userKey, setUserKey ] = useState('');

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
            <h2>{title}</h2>
            <button onClick={updateKey}>Update</button>
            <input type="password" placeholder={`Enter ${title} Key...`} value={userKey} 
                    onChange={(e) => setUserKey(e.target.value)} />
        </>
    )
}