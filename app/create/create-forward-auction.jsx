'use client'
import { useEffect, useCallback, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CreateForwardAuction({ session }) {
    const supabase = createClientComponentClient()
    const user = session?.user

    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ images, setImages ] = useState([])
    const [isPublished, setIsPublished] = useState(false)
    const [ price, setPrice ] = useState("")
    const [ endstime, setEndsTime ] = useState(Date.now())
    const [ loading, setLoading ] = useState(false)

    async function createAuction({ title, description, images, isPublished, price, endstime }) {
        try {
          setLoading(true)
    
          const { error } = await supabase.from('forward_auction').upsert({
            created_by: user?.id,
            title,
            description,
            pictures: images,
            published: isPublished,
            base_price: price,
            ends_at: endstime,
          })
          if (error) {
            throw error
          } else {
            alert("Auction created sussessfully!")
            window.location.reload(false);
          }
        } catch (error) {
          console.log(error)
          throw error
        } finally {
          setLoading(false)
          alert('Auction Created!')
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
                <h2>Create a Forward Auction</h2>
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
                <input
                    type="datetime-local"
                    id="meeting-time"
                    name="meeting-time"
                    value="2023-11-12T12:00"
                    onChange={(e) => handleTime(e.target.value)}
                />
                </div>
                
                <div>
                    <button onClick={() => createAuction({title, description, images, isPublished, price, endstime})}>Create Auction</button>
                </div>
            </div>
        )
    }
}