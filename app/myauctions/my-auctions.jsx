'use client'
import { useCallback, useEffect, useState } from 'react'
import ForwardAuction from './forward-auction'
import Link from 'next/link'

export default function MyAuctions({ session, data, forward_auction }) {
    const [loading, setLoading] = useState(false)
    const [forward, setForward] = useState([])
    const [dutch, setDutch] = useState([])

    const handleSearch = (filter) => {
        let filteredForwardAuctions = forward_auction.filter((auction) => {
            if(auction.description){
                return auction.title.includes(filter) || auction.description.includes(filter)
            } else {
                return auction.title.includes(filter)
            }
        })
        
        let filteredDutchAuctions = data.filter((auction) => {
            if(auction.description){
                return auction.title.includes(filter) || auction.description.includes(filter)
            } else {
                return auction.title.includes(filter)
            }
        })
        
        setForward(filteredForwardAuctions)
        setDutch(filteredDutchAuctions)
    }

    useEffect(() => {
        if(data){
            console.log('is this running??')
            setDutch(data)
        }

        if(forward_auction){
            setForward(forward_auction)
        }
    }, [])

    if(loading){
        return (
            <div>LOADING ...</div>
        )
    } else if (data && forward_auction){
        return (
            <div>
                <div>
                    <label htmlFor="title">Search</label>
                    <input
                    id="search"
                    type="text"
                    placeholder="Search Auctions by title or description .."
                    onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            <h1>DUTCH AUCTIONS</h1>
            <div>
            {dutch.map((el, index) => {
                return (
                    <table key={index}>
                        <tbody>
                            <div>
                                <Link href="/payment">
                                        <button>Go to Payment</button>
                                </Link>
                            </div>
                            <tr>
                                <td>Title:</td>
                                <td><div>{el.title}</div></td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td><div>{el.description}</div></td>
                            </tr>
                            <tr>
                                <td>Published:</td>
                                <td><div>{el.published.toString()}</div></td>
                            </tr>
                            <tr>
                                <td>Starting Price:</td>
                                <td><div>{el.initial_price}</div></td>
                            </tr>
                            <tr>
                                <td>Decrement amount:</td>
                                <td><div>{el.decrement_amount}</div></td>
                            </tr>
                            <tr>
                                <td>Reserve Price:</td>
                                <td><div>{el.reserve_price}</div></td>
                            </tr>
                            <tr>
                                <td>Current Bid:</td>
                                <td><div>{el.current_bid}</div></td>
                            </tr>
                            <tr>
                                <td>Created at:</td>
                                <td><div>{el.created_at}</div></td>
                            </tr>
                            <tr>
                                <td>Images:</td>
                                {el.pictures.map((element, index) => {
                                    return (
                                        <td key={index}>
                                            <img src={element}/>
                                        </td>
                                    )
                                })}
                            </tr>
                        </tbody>
                    </table>
                )
            })}    
            </div>
            <h1>FORWARD AUCTIONS</h1>
            <div>
                <ForwardAuction data={forward} />
            </div>
            {/* This table renders user data - traform into a seperate header component */}
           
        </div>
        )
        
    } else {
        return (
            <div>
                <h1>this user has no auctions</h1>
            </div>
        )
    }
}