"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ForwardBidInput({ session, id }) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [bid_amount, setBidding] = useState(0);
  const user = session?.user;

  const hanlde_bid = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("forward_auction")
        .update({ bidder: user.id, highest_price: bid_amount })
        .eq("id", id)
        .select();
      if (error) throw error;
      alert("Bid Placed!");
    } catch (error) {
      console.log(error);
      // alert('Error updating the data!')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);
  if (loading) {
    return <h1>Loading ...</h1>;
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="number"
          placeholder="Enter your bid here ..."
          onChange={(e) => setBidding(e.target.value)}
          className="w-32"
        />
        <button
          onClick={hanlde_bid}
          className=" ml-6 w-32 rounded-full hover:bg-light_green font-semibold"
        >
          Place Bid
        </button>
      </div>
    );
  }
}
