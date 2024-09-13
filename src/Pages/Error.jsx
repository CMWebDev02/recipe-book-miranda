import React from "react";
import { Link } from "react-router-dom";

export function Error() {
    return (
        <>
            <h1>Error Occurred - Please Navigate Back To Home Page</h1>
            <Link to="/">Return To Home</Link>
        </>
    )
}