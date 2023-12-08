"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export default function SingleDutchAuction({ session, dutch_data }) {
  const [loading, setLoading] = useState(false);
  const [forward, setForward] = useState();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dutch_data) {
      setData(dutch_data[0]);
    }
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data.pictures.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.pictures.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div>LOADING ...</div>;
  } else if (data) {
    return (
      <div className="flex my-5 mx-10 items-start">
        {/* Images */}
        <div className="relative w-80 h-80 mr-5">
          <div className="flex flex-col items-center flex-shrink-0">
          <img src={data.pictures[currentImageIndex]} alt={`Image ${currentImageIndex}`} />
            <div className="flex justify-between w-full mt-4">
              <button
                className="rounded-full hover:bg-light_green font-semibold"
                onClick={() => {prevImage()}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-2 h-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                className="rounded-full hover:bg-light_green font-semibold"
                onClick={() => {nextImage()}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-2 h-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Listing information */}
        {/* <Link href={`/home/dutch/${el.id}`}> */}
          <div className="w-1/2 pl-4">
            <div className="text-2xl text-light_green font-semibold">
              {data.title}
            </div>
            <div className="flex text-lg font-medium">
              Description:{" "}
              <div className="font-extralight ml-2">{data.description}</div>
            </div>
            <div className="flex text-lg font-medium">
              Posted:{" "}
              <div className="font-extralight ml-2">
                {data.published.toString()}
              </div>
            </div>
            <div className="flex text-lg font-medium">
              Starting Price:{" "}
              <div className="font-extralight ml-2">{data.initial_price}</div>
            </div>
            <div className="flex text-lg font-medium">
              Decrement amount:{" "}
              <div className="font-extralight ml-2">{data.decrement_amount}</div>
            </div>
            <div className="flex text-lg font-medium">
              {" "}
              Reserve Price:{" "}
              <div className="font-extralight ml-2">{data.reserve_price}</div>
            </div>
            <div className="flex text-lg font-medium">
              Current Bid:{" "}
              <div className="font-extralight ml-2">{data.current_bid}</div>
            </div>
            <div className="flex text-lg font-medium">
              Created at:{" "}
              <div className="font-extralight ml-2">
                {new Date(data.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        {/* </Link> */}
        {/* Payment button */}
        <div className="relative ml-40">
          <Link
            href={{
              pathname: "/payment",
              query: {
                price: data.initial_price,
              },
            }}
          >
            <button className="absolute right-0 top-1/2 rounded-full hover:bg-light_green font-semibold">
              Pay
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>this user has no auctions</h1>
      </div>
    );
  }
}
