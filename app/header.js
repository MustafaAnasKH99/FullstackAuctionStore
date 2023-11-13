// Import necessary modules
"use client";
import Link from "next/link";
import MyAuctions from "./myauctions/my-auctions";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Define the Header component
export default function Header({ session }) {
  const supabase = createClientComponentClient();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [title, setTitle] = useState("");
  const [datas, setData] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = session?.user;

  // this function gets user data
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, []);

  if (!session) {
    return null;
  }
  else {
    return (
      <header className="bg-gray-900 text-white py-4 sticky top-0 z-50">
        {/* Header container */}
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Website title */}
          <h1 className="text-xl font-semibold">Auctions App</h1>
          {/* Navigation menu */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6">
              {/* Navigation links */}
              <li>
                <Link href="/home" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-gray-300">
                  Account     
                </Link>
                </li>
                <li>
                  <Link href="/myauctions" className="hover:text-gray-300">
                    My Auctions
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="hover:text-gray-300">
                    Create an Auction
                  </Link>
                </li>
            </ul>
          </nav>
          {/* Social media icons */}
          <div className="hidden md:block">
            <SocialIcons fullname={fullname} username={username} />
          </div>
          {/* Add Mobile Navigation Toggle Here */}
        </div>
      </header>
    );
  }
}

// Define the SocialIcons component
function SocialIcons({ fullname, username }) {
  return (
    <div className="flex gap-x-4">
      <table>
        <tbody>
          <tr>
            <td>Full Name:</td>
            <td>
              <div>{fullname}</div>
            </td>
          </tr>
          <tr>
            <td>Username:</td>
            <td>
              <div>{username}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
