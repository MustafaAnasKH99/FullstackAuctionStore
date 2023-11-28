// Import global styles
import './globals.css';

// Import necessary types from Next.js
// Note: In JavaScript, we don't need to use "type" for imports
import { Metadata } from 'next';

// Import the Inter font from Google Fonts
import { Raleway } from 'next/font/google';

// Import the Header and Footer components
import Header from './header';

import { cookies } from 'next/headers'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import Footer from './footer';

// Initialize the Inter font with a Latin subset
const raleway = Raleway({ subsets: ['latin'] });

// Define metadata for the website
export const metadata = {
  title: "Auctions",
  description: "Quick Auction App",
};

// Define the RootLayout component, which will be used to wrap pages
export default async function RootLayout({
  children, // React children components to be wrapped

}) {

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  return (
    // Start of the HTML document
    <html lang="en">
      {/* Set the body class to apply the Inter font */}
      <body className={raleway.className}>
        {/* Include the Header component */}
        <Header session={session}/>

        {/* Render the child components within the layout */}
        {children}

        {/* Include the Footer component */}
        {/* <Footer /> */}
      </body>
    </html>
    // End of the HTML document
  );
}
