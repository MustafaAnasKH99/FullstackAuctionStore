'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function MyAuctions({ session, data }) {
    
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
    
    // this function gets user data
    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, username, website, avatar_url`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setFullname(data.full_name)
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [])

    if(loading){
        return (
            <div>LOADING ...</div>
        )
    } else if (data){
        return (
            <div>
            <h1>{username}'s current active auctions</h1>
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
            {/* This table renders user data - traform into a seperate header component */}
            <table>
                <tbody>
                    <tr>
                        <td>Full Name:</td>
                        <td><div>{fullname}</div></td>
                    </tr>
                    <tr>
                        <td>Username:</td>
                        <td><div>{username}</div></td>
                    </tr>
                    <tr>
                        <td>Website:</td>
                        <td><div>{website}</div></td>
                    </tr>
                    <tr>
                        <td>Avatar URL:</td>
                        <td><div>{avatarUrl}</div></td>
                    </tr>
                </tbody>
            </table>
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