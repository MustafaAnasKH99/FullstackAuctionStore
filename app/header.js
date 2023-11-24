// Import necessary modules
"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Manrope }  from 'next/font/google';


const manrope = Manrope({ subsets: ['latin'] });

export default function Header({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!session) {
    return null;
  } else {
    return (
      <header className="text-white py-4">
        <div className="flex items-center justify-between">
          <Link href="/home" className={manrope.className} >
            <h1 className="hover:text-light_green text-3xl text-dark_green font-bold pl-5">
              Auctions
            </h1>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 justify-center w-full">
              <li>
                <Link href="/home" className="hover:text-light_green">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/myauctions" className="hover:text-light_green">
                  My Auctions
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-light_green">
                  Create an Auction
                </Link>
              </li>
            </ul>
          </nav>
          <div className="">
            <SocialIcons fullname={fullname} username={username} />
          </div>




          <div className="md:hidden">
            <button onClick={isMenuOpen ? closeMenu : toggleMenu}>
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            <div
              className={`md:hidden fixed top-0 right-0 h-full bg-black bg-opacity-50 w-4/5 transform transition-transform ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <nav className="pt-20 text-center">
                <ul>
                  <li>
                    <Link href="/home" className="hover:text-light_green" onClick={closeMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/myauctions" className="hover:text-light_green" onClick={closeMenu}>
                      My Auctions
                    </Link>
                  </li>
                  <li>
                    <Link href="/create" className="hover:text-light_green" onClick={closeMenu}>
                      Create an Auction
                    </Link>
                  </li>
                  {/* Add more menu items if needed */}
                </ul>
              </nav>
            </div>
          </div>


          
        </div>
      </header>
    );
  }
}

// Define the SocialIcons component
function SocialIcons({ fullname, username }) {
  return (
    <div className="pr-5">
      <Link href="/account" className="">
        <button
          className="rounded-full hover:bg-light_green"
          style={{ textTransform: "none" }}
        >
          <div className="flex items-center">
            <div>{fullname}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-6 pl-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
        </button>
      </Link>
    </div>
  );
}
