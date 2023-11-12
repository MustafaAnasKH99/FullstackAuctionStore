'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ForwardAuction({ data }) {
    const [loading, setLoading] = useState(false)

    useEffect(() => {

    }, [])

    if(loading){
        return (
            <div>LOADING ...</div>
        )
    } else if (data){
        return (
            <div>
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
                                <td>Starting Price:</td>
                                <td><div>{el.base_price}</div></td>
                            </tr>
                            <tr>
                                <td>Decrement amount:</td>
                                <td><div>{el.highest_price}</div></td>
                            </tr>
                            <tr>
                                <td>Reserve Price:</td>
                                <td><div>{el.end_at}</div></td>
                            </tr>
                            <tr>
                                <td>Created at:</td>
                                <td><div>{el.created_at}</div></td>
                            </tr>
                            <tr>
                                <td>Open Until:</td>
                                <td><div>{el.ends_at}</div></td>
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
        </div>
        )
        
    } else {
        return (
            <div>
                <h1>this user has no forward auctions</h1>
            </div>
        )
    }
}