'use client'
import { useEffect, useCallback, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CreateDutchAuction({ session }) {
    const supabase = createClientComponentClient()
    const user = session?.user

    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ images, setImages ] = useState([])
    const [isPublished, setIsPublished] = useState(false)
    const [ price, setPrice ] = useState("")
    const [ endstime, setEndsTime ] = useState(Date.now())
    const [ loading, setLoading ] = useState(false)
    const [ decrementAmount, setDecrementAmount ] = useState("")
    const [ reservePrice, setReservePrice ] = useState("");

    async function createAuction({ title, description, images, isPublished, price, endstime, decrementAmount, reservePrice}) {
        try {
          setLoading(true)
    
          const { error } = await supabase.from('dutch_auction').upsert({
            created_by: user?.id,
            title,
            description,
            pictures: images,
            published: isPublished,
            initial_price: price,
            decrement_amount: decrementAmount,
            reserve_price: reservePrice
          })
          if (error) {
            throw error
          } else {
            alert("Dutch Auction created sussessfully!")
            window.location.reload(false);
          }
        } catch (error) {
          console.log(error)
          throw error
        } finally {
          setLoading(false)
          alert('Dutch Auction Created!')
        }
    }

 useEffect(() => {

    }, [])

    const handleTime = (el) => {
        const event = new Date(el)
        const final_date = event.toISOString()
        setEndsTime(final_date)
    }

    const handleImages = (el) => {
        const event = el.replace(/\s/g, '')
        const final_event = event.split(",")
        setImages(final_event)
    }
    if(loading){
        return (
            <div>
                <h1>Creating Auction ...</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Create a Dutch Auction</h2>
                <div>
                    <button onClick={() => setIsPublished(!isPublished)}>{isPublished ? "Published" : "Unpublished"}</button>
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="title">Description</label>
                    <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="title">Choose Images</label>
                    <input
                    id="images"
                    type="text"
                    placeholder="Insert links for images separated by commas ex: Link1, Link2, etc ..."
                    onChange={(e) => handleImages(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="decrementAmont">Decrement Amount</label>
                    <input
                    id="decrementAmount"
                    type="number"
                    value={decrementAmount}
                    onChange={(e) => setDecrementAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="reservePrice">Reserve Price</label>
                    <input
                    id="reservePrice"
                    type="number"
                    value={reservePrice}
                    onChange={(e) => setReservePrice(e.target.value)}
                    />
                </div>                
                <div>
                    <button onClick={() => createAuction({title, description, images, isPublished, price, decrementAmount, reservePrice})}>Create Auction</button>
                </div>
            </div>
        )
    }
}