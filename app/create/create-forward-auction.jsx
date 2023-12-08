"use client";
import { useEffect, useCallback, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CreateForwardAuction({ session }) {
  const supabase = createClientComponentClient();
  const user = session?.user;

  const [title, setTitle] = useState("");
  const [loadingDescription, setloadingAI] = useState(false);
  const [aiImagePreview, setAiImagePreview] = useState(false);
  const [aiImageURL, setAiImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [endstime, setEndsTime] = useState(Date.now());
  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState("");
  const [priceError, setpriceError] = useState(true);

  async function createAuction({
    title,
    description,
    images,
    isPublished,
    price,
    endstime,
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("forward_auction").upsert({
        created_by: user?.id,
        title,
        description,
        pictures: images,
        published: isPublished,
        base_price: price,
        ends_at: endstime,
      });
      if (error) {
        throw error;
      } else {
        alert("Forward Auction created sussessfully!");
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
      alert("Forward Auction Created!");
    }
  }
  function checkPrice(value) {
    const validity = String(value).match("[0-9]{1,9}") && parseInt(value) >= 0;
    if (validity) {
      setpriceError(false);
    } else {
      setpriceError(true);
    }
    setPrice(value);
  }

  useEffect(() => {}, []);

  const generateAIImage = async (description) => {
    setloadingAI(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        prompt: description,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://asassistant-z4xrhjgh3q-uc.a.run.app/aiassistant/image/",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setloadingAI(false);
          setAiImageURL(result.image_obj.data[0].url);
          setAiImagePreview(true);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  const generateAIDescription = async (title) => {
    try {
      const requestOptions = {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        redirect: "follow",
      };
      setloadingAI(true);
      fetch(
        `https://asassistant-z4xrhjgh3q-uc.a.run.app/aiassistant/description/?title=${title}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setloadingAI(false);
          setDescription(result["description"]["content"]);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  const aiImageAccepted = () => {
    setAiImagePreview(false);
    setImages([...images, aiImageURL]);
  };

  const handleTime = (el) => {
    const event = new Date(el);
    const final_date = event.toISOString();
    setEndsTime(final_date);
  };

  const handleImages = (el) => {
    const event = el.replace(/\s/g, "");
    const final_event = event.split(",");
    setImages(final_event);
  };
  if (loading) {
    return (
      <div>
        <h1>Creating Auction ...</h1>
      </div>
    );
  } else if (loadingDescription) {
    return (
      <div>
        <h1>Your assistant AI taking care of it ...</h1>
      </div>
    );
  } else if (aiImagePreview) {
    return (
      <div>
        <img src={aiImageURL} alt="AI generated" />
        <div>
          <button
            onClick={() => {
              aiImageAccepted();
            }}
          >
            Add image to my images
          </button>
          <button onClick={() => setAiImagePreview(false)}>
            I will upload my own image
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1>{isPublished ? "Published" : "Unpublished"}</h1>
          <label className="toggle">
            <input
              type="checkbox"
              checked={isPublished}
              onClick={() => setIsPublished(!isPublished)}
            />
            <div className="slider text-light_green" />
          </label>
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {title.length < 5 ? (
            <button disabled>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
              Suggest a description
            </button>
          ) : (
            <button onClick={() => generateAIDescription(title)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
              Suggest a description
            </button>
          )}
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
          {description.length < 100 ? (
            <div></div>
          ) : (
            <button onClick={() => generateAIImage(description)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
              Generate an image from your desccription
            </button>
          )}
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
        {(priceError && <div>Enter a valid price</div>) || (
          <div>
            <button
              onClick={() =>
                createAuction({
                  title,
                  description,
                  images,
                  isPublished,
                  price,
                  endstime,
                })
              }
            >
              Create Auction
            </button>
          </div>
        )}
      </div>
    );
  }
}
