import React from "react";
import { Link } from "react-router-dom";

/**
 * @component Displays a redirect if any incorrect error occurs in the routing of the user's url.
 */
export function Error() {
    return (
        <>
            <h1>Error Occurred - Please Navigate Back To Home Page</h1>
            {/* Links back to the home page of the project. */}
            <Link to="/">Return To Home</Link>
        </>
    )
}