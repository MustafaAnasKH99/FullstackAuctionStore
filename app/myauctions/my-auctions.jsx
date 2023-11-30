"use client";
import { useCallback, useEffect, useState } from "react";
import ForwardAuction from "./forward-auction";
import DutchBidInput from "./dutch-bid-input";
import Link from "next/link";

export default function MyAuctions({ session, data, forward_auction }) {
  const [loading, setLoading] = useState(false);
  const [forward, setForward] = useState([]);
  const [dutch, setDutch] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSearch = (filter) => {
    let filteredForwardAuctions = forward_auction.filter((auction) => {
      if (auction.description) {
        return (
          auction.title.includes(filter) || auction.description.includes(filter)
        );
      } else {
        return auction.title.includes(filter);
      }
    });

    let filteredDutchAuctions = data.filter((auction) => {
      if (auction.description) {
        return (
          auction.title.includes(filter) || auction.description.includes(filter)
        );
      } else {
        return auction.title.includes(filter);
      }
    });

    setForward(filteredForwardAuctions);
    setDutch(filteredDutchAuctions);
  };

  useEffect(() => {
    if (data) {
      console.log("is this running??");
      setDutch(data);
    }

    if (forward_auction) {
      setForward(forward_auction);
    }
  }, []);

  if (loading) {
    return <div>LOADING ...</div>;
  } else if (data && forward_auction) {
    return (
      <div>
        <div>
          <label htmlFor="title">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search Auctions by title or description .."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <h1>DUTCH AUCTIONS</h1>
        <div>
          {dutch.map((el, index) => {
            return (
              <table key={index}>
                <tbody>
                  <tr>
                    <div className="flex">
                      {/* Images */}
                      <div className="relative w-1/4">
                        <img
                          className="w-full h-full object-cover"
                          src={el.pictures[currentImageIndex]}
                          alt="Listing"
                        />
                        <button
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-light_green font-semibold"
                          onClick={() =>
                            setCurrentImageIndex(
                              (currentImageIndex - 1 + el.pictures.length) %
                                el.pictures.length
                            )
                          }
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
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </button>
                        <button
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-light_green font-semibold"
                          onClick={() =>
                            setCurrentImageIndex(
                              (currentImageIndex + 1) % el.pictures.length
                            )
                          }
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
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Listing information */}
                      <div className="w-1/2 pl-4">
                        <div>{el.title}</div>
                        <div>{el.description}</div>
                        <div>Posted: {el.published.toString()}</div>
                        <div>Starting Price: {el.initial_price}</div>
                        <div>Decrement amount: {el.decrement_amount}</div>
                        <div>Reserve Price: {el.reserve_price}</div>
                        <div>Current Bid: {el.current_bid}</div>
                        <div>Created at: {el.created_at}</div>
                      </div>

                      {/* Payment button */}
                      <div className="w-1/2 pl-4 ">
                        <Link href="/payment">
                          <button className="rounded-full hover:bg-light_green font-semibold">
                            Pay
                          </button>
                        </Link>
                      </div>
                    </div>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
        <h1>FORWARD AUCTIONS</h1>
        <div>
          <ForwardAuction session={session} data={forward} />
        </div>
        {/* This table renders user data - traform into a seperate header component */}
      </div>
    );
  } else if (data) {
    // This is to handle rendering the page of one dutch auction -- needs refactoring (ignore errors)
    return (
      <div>
        {data.map((el, index) => {
          return (
            <table key={index}>
              <tbody>
                <div className="flex">
                  {/* Images */}
                  <div className="relative">
                    <img
                      className="w-84 h-64 object-cover"
                      src={el.pictures[currentImageIndex]}
                      alt="Listing"
                    />
                    <button
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-light_green font-semibold"
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex - 1 + el.pictures.length) %
                            el.pictures.length
                        )
                      }
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
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>
                    <button
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-light_green font-semibold"
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex + 1) % el.pictures.length
                        )
                      }
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
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Listing information */}
                  <div className="w-1/2 pl-4">
                    <div>{el.title}</div>
                    <div>{el.description}</div>
                    <div>Posted: {el.published.toString()}</div>
                    <div>Starting Price: {el.initial_price}</div>
                    <div>Decrement amount: {el.decrement_amount}</div>
                    <div>Reserve Price: {el.reserve_price}</div>
                    <div>Current Bid: {el.current_bid}</div>
                    <div>Created at: {el.created_at}</div>
                  </div>

                  {/* Payment button */}
                  <div className="relative w-1/2 pl-4 ">
                    <Link href="/payment">
                      <button className="absolute right-0 top-1/2 rounded-full hover:bg-light_green font-semibold">
                        Pay
                      </button>
                    </Link>
                  </div>
                </div>
                {/* <tr>
                  <td>Status:</td>
                  {el.accepted_bidder ? (
                    <td>Auction Already Accepted</td>
                  ) : (
                    <DutchBidInput session={session} id={data[0].id} />
                  )}
                </tr>
                <tr>
                  <td>Images:</td>
                  {el.pictures.map((element, index) => {
                    return (
                      <td key={index}>
                        <img src={element} />
                      </td>
                    );
                  })}
                </tr> */}
              </tbody>
            </table>
          );
        })}
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
