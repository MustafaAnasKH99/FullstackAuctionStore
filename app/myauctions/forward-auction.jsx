"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ForwardBidInput from "./forward-bid-input";

export default function ForwardAuction({ session, data }) {
  const [loading, setLoading] = useState(false);
  const [bid, setBid] = useState(false);
  const [id, setId] = useState(false);

  useEffect(() => {}, []);

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
      <div>
        <div>
          {data.map((el, index) => {
            return (
              <div key={index} className="flex">
                <div className="">
                  <Link  href={`/home/forward/${el.id}`}>
                    <table key={index}>
                      <div className="flex my-5 mx-10 items-start">
                        {/* Images */}
                        <div className="relative w-80 h-80 mr-5">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <img
                              src={el.pictures[currentImageIndex]}
                              alt={`Image ${currentImageIndex}`}
                            />
                            <div className="flex justify-between w-full mt-4">
                              <button
                                className="rounded-full hover:bg-light_green font-semibold"
                                onClick={() => {
                                  prevImage();
                                }}
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
                                onClick={() => {
                                  nextImage();
                                }}
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
                          <div className="text-lg text-light_green font-semibold">
                            {el.title}
                          </div>
                          <div className="flex text-sm font-medium">
                            Description:{" "}
                            <div className="font-extralight ml-2">
                              {el.description}
                            </div>
                          </div>
                          <div className="flex text-sm font-medium">
                            Posted:{" "}
                            <div className="font-extralight ml-2">
                              {el.published.toString()}
                            </div>
                          </div>
                          <div className="flex text-sm font-medium">
                            Starting Price:{" "}
                            <div className="font-extralight ml-2">
                              {el.initial_price}
                            </div>
                          </div>
                          <div className="flex text-sm font-medium">
                            Current Price:{" "}
                            <div className="font-extralight ml-2">
                              {el.highest_price}
                            </div>
                          </div>
                          <div className="flex text-sm font-medium">
                            {" "}
                            Current Bid Winner:{" "}
                            <div className="font-extralight ml-2">
                              {el.created_at}
                            </div>
                          </div>
                          <div className="flex text-sm font-medium">
                            Open Until:{" "}
                            <div className="font-extralight ml-2">
                              {el.ends_at}
                            </div>
                          </div>
                          <div className="flex text-sm font-medium">
                            Created at:{" "}
                            <div className="font-extralight ml-2">
                              {new Date(el.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        {/* </Link> */}
                        {/* Payment button */}
                        {/* <div className="relative ml-40"></div> */}
                      </div>
                    </table>
                  </Link>
                </div>
                <div className="relative ml-40">
                  <ForwardBidInput session={session} id={el.id} />
                </div>
              </div>
            );
          })}
        </div>
        {/* <div>
          <button onClick={(e) => setBid(!bid)}>Bid</button>
        </div> */}
        <div>
          {bid ? <ForwardBidInput session={session} id={el[0].id} /> : <p></p>}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>this user has no forward auctions</h1>
      </div>
    );
  }
}
