'use client'
import { useEffect, useCallback, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CreateForwardAuction({ session }) {
    const supabase = createClientComponentClient()
    const user = session?.user

    const [ title, setTitle ] = useState("")
    const [ loadingDescription, setloadingAI ] = useState(false)
    const [ aiImagePreview, setAiImagePreview ] = useState(false)
    const [ aiImageURL, setAiImageURL ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ images, setImages ] = useState([])
    const [isPublished, setIsPublished] = useState(false)
    const [ endstime, setEndsTime ] = useState(Date.now())
    const [ loading, setLoading ] = useState(false)

    const [ price, setPrice ] = useState("")
    const [priceError, setpriceError] = useState(true); 

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
            alert("Forward Auction created sussessfully!")
            window.location.reload(false);
          }
        } catch (error) {
          console.log(error)
          throw error
        } finally {
          setLoading(false)
          alert('Forward Auction Created!')
        }
    }
    function checkPrice(value){
        const validity = String(value).match("[0-9]{1,9}") && parseInt(value) >= 0
        if(validity){
            setpriceError(false)
        }else{
            setpriceError(true)
        } 
        setPrice(value)
    }

    useEffect(() => {

    }, [])

    const generateAIImage = async (description) => {
        setloadingAI(true)
        try{
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "prompt": description
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://asassistant-z4xrhjgh3q-uc.a.run.app/aiassistant/image/", requestOptions)
            .then(response => response.json())
            .then(result => {setloadingAI(false); setAiImageURL(result.image_obj.data[0].url); setAiImagePreview(true)})
            .catch(error => console.log('error', error));

        } catch (error) {
            console.error('Error:', error);
            alert(error)
        }
    }

    const generateAIDescription = async (title) => {
        try{
            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
                redirect: 'follow'
            };
            setloadingAI(true)
            fetch(`https://asassistant-z4xrhjgh3q-uc.a.run.app/aiassistant/description/?title=${title}`, requestOptions)
                .then(response => response.json())
                .then(result => {setloadingAI(false); setDescription(result["description"]["content"])})
                .catch(error => console.log('error', error));

        } catch (error) {
            console.error('Error:', error);
            alert(error)
        }
    }

    const aiImageAccepted = () => {
        setAiImagePreview(false)
        setImages([...images, aiImageURL])
    }

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
    } else if (loadingDescription) { 
        return (
            <div>
                <h1>Your assistant AI taking care of it ...</h1>
            </div>
        )
    } else if (aiImagePreview) {
        return (
            <div>
                <img src={aiImageURL} alt="AI generated" />
                <div>
                    <button onClick={() => {aiImageAccepted()}}>Add image to my images</button>
                    <button onClick={() => setAiImagePreview(false)}>I will upload my own image</button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
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
                    onChange={(e) => checkPrice(e.target.value)}
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
                {(priceError && <div>Enter a valid price</div>)
                    ||
                <div>
                    <button onClick={() => createAuction({title, description, images, isPublished, price, endstime})}>Create Auction</button>
                </div>
                }
            </div>
        )
    }
}