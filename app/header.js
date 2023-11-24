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
  } else {
    return (
      <header className="text-white py-4">
        {/* Header container */}
        <div className="container flex items-center justify-between">
          {/* Website title */}
          <h1 className="text-2xl">Auctions</h1>
          {/* Navigation menu */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 justify-center w-full">
              {/* Navigation links */}
              <li>
                <Link href="/home" className="hover:text-#7DE2D1-900">
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
    <div className="">
        <tbody>
          <tr>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>

            <td>
              <div>{fullname}</div>
            </td>
          </tr>
        </tbody>
    </div>
  );
}
