'use client'
import { useEffect } from "react";
import MyAuctions from "../myauctions/my-auctions";

export default function Home({ session, dutch_auction, forward_auction }) {

    useEffect(() => {

    }, [])
    
    if(dutch_auction && forward_auction){
        <div>
            <div>
                <MyAuctions session={session} data={dutch_auction} forward_auction={forward_auction} />
            </div>
        </div>
    } else {
        return (
            <div>No Auctions right now. Check back later ...</div>
        )
    }
}