'use client'
import { useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

  
export default function DutchBidInput({ session, id }) {
    const supabase = createClientComponentClient()
    const user = session?.user

    const [loading, setLoading] = useState(false)

    const hanlde_bid = async () => {
        try {
            setLoading(true)
            const { error } = await supabase.from('dutch_auction')
            .update({ accepted_bidder: user.id })
            .eq('id', id)
            .select()
            if (error) throw error
            alert('Dutch Auction Accepted!')
          } catch (error) {
            console.log(error)
            // alert('Error updating the data!')
          } finally {
            setLoading(false)
          }
    }

    useEffect(() => {

    }, [])
    if(loading){
        return <h1>Loading ...</h1>
    } else {
        return (
            <div>
                <button onClick={hanlde_bid}>Accept Auction Price</button>
            </div>
        )
    }
}