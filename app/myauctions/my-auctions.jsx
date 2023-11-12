'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ForwardAuction from './forward-auction'

export default function MyAuctions({ session, data, forward_auction }) {
    
    const supabase = createClientComponentClient()
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [title, setTitle] = useState('')
    const [datas, setData] = useState([])
    const [auctions, setAuctions] = useState([])
    const [loading, setLoading] = useState(false)
    const user = session?.user

    useEffect(() => {
        
    }, [])

    if(loading){
        return (
            <div>LOADING ...</div>
        )
    } else if (data && forward_auction){
        return (
            <div>
            <h1>DUTCH AUCTIONS</h1>
            <div>
            {data.map((el, index) => {
                return (
                    <table key={index}>
                        <tbody>
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
                <ForwardAuction data={forward_auction} />
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