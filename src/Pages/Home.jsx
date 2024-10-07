import React from "react";
import { PageLinks } from "../Components/PageLinks";

export function Home() {
    return (
        <div>
            <h1>Welcome!</h1>
            <p>
                Find any recipe you can think of and save them to your <strong>recipe book</strong> and<br />
                plan out your meals for the week with the build in <strong>meal planner</strong>.
            </p>
            <PageLinks />
            
        </div>
    )
}