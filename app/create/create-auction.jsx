"use client";
import { useEffect, useCallback, useState } from "react";
import CreateForwardAuction from "./create-forward-auction";
import CreateDutchAuction from "./create-dutch-auction";
import "./styles.css"; 

export default function CreateAuction({ session }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {}, []);

    

    return (
        <div className="flex justify-center">
            <h1>{open ? 'Forward' : 'Dutch'}</h1>
            
            <label className="toggle">
                <input type="checkbox" checked={open} onChange={() => setOpen(!open)} />
                <div className="slider text-light_green" />
            </label>
            
            <div>
                {open ? (
                    <CreateForwardAuction session={session} />
                ) : (
                    <CreateDutchAuction session={session} />
                )}
            </div>
        </div>
    );
}

