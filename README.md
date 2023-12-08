## E-Commerce Auction Website/System 
 
This project aims to create a safe, modular, and easily accessible E-Commerce Auction Website/System. The system will support two different auction types: Forward Auction and Dutch Auction. 

[Find full report document here](https://docs.google.com/document/d/1746KABwrcjDPuOvBTba7e2II1Wb_wxzSZyoDqgtljTw/edit?usp=sharing)
### Forward Auction 
In a Forward Auction, the seller sets an initial price, and bidders compete by offering higher prices. Bidders need to increase their maximum bid until the set time ends. The highest bidder at the end of the auction will acquire the listed item. 
 
### Dutch Auction 
In a Dutch Auction, the user listing the item starts with a higher price. This initial price is usually set too high, and the user decrements the price until bids that are higher or equal to the reserved price are placed. The auction ends when either the reserved price is reached or the time ends. 
 
### Project Overview 
Our project focuses on creating a highly compatible front-end and back-end system. We aim to develop an efficient, secure, and fast auctioning system that users can rely on anytime and anywhere. To achieve this, we will be utilizing Next.js, a React framework known for its modular architecture. Next.js allows us to add extra features along the way without affecting the entire project. This means we can design each React component independently, almost equivalent to user cases. 

> **_NOTE:_** We have a docekrized microservice that is deployed and this app uses it to enable the ai assistance features.
That microservice was deleted in the latest push to github as it caused issues in deployed the app to vercel. It is a seperate container anyways and should not live in the same container anyways. If you want to check the code for that, please refer to earleir commits, or [test the docker image here](https://hub.docker.com/repository/docker/mustafaanaskh99/asassistant/general)

 
### Technologies Used 
1) Supabase:
    - Choosing a free, flexible and scalable database for handling large volumes of data.
2) Npm/Yarn:
    - Opting for a fast and secure package manager for efficient dependency management.
3) NextJs (NextAuth):
    - Selecting a robust framework for building dynamic and server-rendered React applications with integrated authentication.
4) React.js with Javascript:
    - Using a powerful and popular library for building interactive user interfaces.
5) Tailwind CSS:
    - Leveraging a utility-first CSS framework for rapid and customizable UI development.
6) Stripe:
    - Integrating a reliable and developer-friendly payment processing solution.

### Installation and Setup

> **_NOTE:_** to run this program, you need to have access to the database. After you follow the steps below and install the project, create a new `.env.loca` file in the root directory. Paste the below piece of code inside and fill the variable values by the info we send you. Paste the values directly. Do not put double or single quotes around.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

To run the project locally, follow these steps: 
 
1. Clone the repository:  `git clone`
2. Navigate to the root directory: `cd ./FullstackAuctionStore`
3. Install dependencies:  `npm install`
4. Start the development server:  `npm run dev `
5. Access the website at  http://localhost:3000
6. to run tests: `npx jest`

### Deployment
[Check deployed version here](https://fullstack-auction-store-mustafaanaskh99s-projects.vercel.app/)

> **_NOTE:_** to run this program, you need to have nodejs and npm installed. Install latest version [here](https://nodejs.org/en/download)
 
### Contributors 
- [Mustafa Kharnoub](https://github.com/MustafaAnasKH99) 
- [Ahmed Khafaji](https://github.com/khafaji-ahmed)
- [Krishna Raju](https://github.com/KrishnaR7626)
- [Alp Baran Sirek](https://github.com/hiimangel)
 

### References 
1. [Learn: Next.Js. Next.Js by Vercel - The React Framework](https://nextjs.org/learn-pages-router/foundations/about-nextjs/what-is-nextjs)
 
2. [React.Component – React. (n.d.). React. ](https://legacy.reactjs.org/docs/react-component.html) 
 
3. [Chethiyawardhana, Manusha. “React Nesting Components: Rules to Follow.” Medium, Bits and Pieces, 27 Apr. 2023](https://blog.bitsrc.io/react-nesting-components-rules-to-follow-c0658ee6ef5) 
 
4. [Chen, James. “Dutch Auction: Understanding How It’s Used in Public Offerings.” Investopedia, Investopedia, 26 Oct. 2022](https://www.investopedia.com/terms/d/dutchauction.asp)
 
5. [“What Are Forward Auctions?” GEP, 18 Mar. 2016](https://www.gep.com/knowledge-bank/glossary/what-are-forward-auctions#:~:text=Forward%20auctions%20are%2C%20essentially%2C%20eAuctions,other%20by%20submitting%20higher%20bids)