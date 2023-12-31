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
        <img
          src="https://media0.giphy.com/media/VseXvvxwowwCc/giphy.gif?cid=ecf05e47010chjcopxjeg14asyidr12m34nahebft1gbjxl1&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="loading"
          className="w-96 h-96 rounded-full"
        />
        <h1></h1>
        {loadingDescription ? null : (
          <div>{/* ... Elements for Dutch auction ... */}</div>
        )}
      </div>
    );
  } else if (aiImagePreview) {
    return (
      <div className="">
        <img
          src={aiImageURL}
          alt="AI generated"
          className="flex items-center w-96 border-2"
        />
        <div className="flex justify-center my-8">
          <button
            onClick={() => {
              aiImageAccepted();
            }}
            className="flex items-center mx-4 rounded-xl hover:bg-light_green"
          >
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
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
          <button
            onClick={() => setAiImagePreview(false)}
            className="flex items-center mx-4 rounded-xl hover:bg-light_green"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex flex-col">
          <div className="flex items-center">
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
          <label htmlFor="title" className="font-bold mb-2">
            Title
          </label>
          <div className="flex justify-between items-center">
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-3/4 h-10"
            />
            {title.length > 0 ? (
              <button
                onClick={() => generateAIDescription(title)}
                className="flex items-center mx-4 w-full rounded-xl hover:bg-light_green"
              >
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
                Suggest AI description
              </button>
            ) : null}
          </div>
        </div>
        <div>
          <label htmlFor="title" className="font-bold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-3/4 h-40 resize-none border border-light_black radius rounded-xl p-2 bg-background_black"
            placeholder="Enter description here..."
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold mb-2">
            Choose Images
          </label>
          <div className="flex justify-between items-center">
            <div className="relative group">
              <div className="inline-block rounded p-2 hover:bg-gray-200">
                ?
              </div>
              <div className="w-40 text-xs absolute z-10 -mt-10 bg-gray-700 text-white px-2 py-1 rounded-xl opacity-0 invisible transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:visible border bg-light_black">
                Insert links to images seperated by commas
              </div>
            </div>
            <input
              id="images"
              type="text"
              value={images.toString()}
              onChange={(e) => handleImages(e.target.value)}
              className="w-40"
            />
            {description.length < 100 ? (
              <div></div>
            ) : (
              <button
                onClick={() => generateAIImage(description)}
                className="flex items-center mx-4 w-96 rounded-xl hover:bg-light_green"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
                Generate image
              </button>
            )}
          </div>
        </div>
        <div className="my-4">
          <label htmlFor="price" className="font-bold">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => checkPrice(e.target.value)}
            className="w-2/3"
          />
        </div>
        <div>
          <input
            type="datetime-local"
            id="meeting-time"
            name="meeting-time"
            // value="2023-11-12T12:00"
            onChange={(e) => handleTime(e.target.value)}
            className="w-full"
          />
        </div>
        {(priceError && <div className="my-8">Enter a valid price</div>) || (
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
              className="flex items-center m-8 rounded-xl hover:bg-light_green"
            >
              Create Auction
            </button>
          </div>
        )}
      </div>
    );
  }
}
