// Import global styles
import './globals.css';
import AuthForm from './auth-form'


export default function Home() {
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="mainHeader header">Welcome to our Auction Store</h1>
        <p className="">
          You can find items to bid on. We offer two types of auctions. Forward Auction 
          is where the price starts low and goes up. Dutch Auction is where the starting price
          only keeps on going down until someone bids on it and immediately gets it.
        </p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  )
}