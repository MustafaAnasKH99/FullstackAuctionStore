"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export default function SingleForwardAuction({ session, forward_data }) {
  const [loading, setLoading] = useState(false);
  const [forward, setForward] = useState();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (forward_data) {
      setData(forward_data[0]);
    }
  }, []);

  if (loading) {
    return <div>LOADING ...</div>;
  } else if (data) {
    console.log(data)
    return (
      <div>
        <table>
          <tbody>
              <tr>
                  <td>Title:</td>
                  <td><div>{data.title}</div></td>
              </tr>
              <tr>
                  <td>Description:</td>
                  <td><div>{data.description}</div></td>
              </tr>
              <tr>
                  <td>Published:</td>
                  <td><div>{data.published.toString()}</div></td>
              </tr>
              <tr>
                  <td>Starting Price:</td>
                  <td><div>{data.base_price}</div></td>
              </tr>
              <tr>
                  <td>Current Price:</td>
                  <td><div>{data.highest_price}</div></td>
              </tr>
              <tr>
                  <td>Created at:</td>
                  <td><div>{data.created_at}</div></td>
              </tr>
              <tr>
                  <td>Created by:</td>
                  <td><div>{data.created_by}</div></td>
              </tr>
              <tr>
                  <td>Current bid winner:</td>
                  <td><div>{data.bidder}</div></td>
              </tr>
              <tr>
                  <td>Open Until:</td>
                  <td><div>{data.ends_at}</div></td>
              </tr>
              <tr>
                  <td>Images:</td>
                  {data.pictures.map((element, index) => {
                      return (
                          <td key={index}>
                              <img src={element}/>
                          </td>
                      )
                  })}
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
    );
  }
}
