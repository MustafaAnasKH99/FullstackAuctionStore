'use client'
import { useEffect, useCallback, useState } from "react";
import CreateForwardAuction from "./create-forward-auction";
import CreateDutchAuction from "./create-dutch-auction";

export default function CreateAuction({ session }) {
    const [ open, setOpen ] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <div>
            <h1>Create a listing from here</h1>
            <div>
                { open ? <CreateForwardAuction session={session} /> : <CreateDutchAuction session={session} />}
            </div>
            <button onClick={() => setOpen(!open)}>{open ? "Toggle to Dutch" : "Toggle to Forward"}</button>
        </div>
    )
}