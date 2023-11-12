"use client"
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function PaymentForm({ session }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [fname,setfName] = useState(null);
  const [lname,setlName] = useState(null);
  const [street,setStreet] = useState(null);
  const [Number,setNumber] = useState(null);
  const [province,setProvince] = useState(null);
  const [country,setCountry] = useState(null);
  const [postalCode,setPostalCode] = useState(null);
  const [totalcost,setTotalcost] = useState("$ 200");

  const [cardNumber,setCardNumber] = useState('');
  const [cardName,setCardName] = useState('');
  const [expiry,setExpiry] = useState('');
  const [securityCode,setSecurityCode] = useState('');



  const user = session?.user
  const getCreditCard = useCallback(async () => {
    try {

        const { data, error, status } = await supabase
        .from('payments')
        .select(`id, credit_card_number, card_name, card_expiry, card_code`)
        .eq('id', user?.id)
        .single()
        if (error && status !== 406) {
            throw error
          }
        if (data) {
            setCardNumber(data.credit_card_number)
            setCardName(data.card_name)
            setExpiry(data.card_expiry)
            setSecurityCode(data.card_code)
        }
    } catch (error) {
        console.log(error)
    //   alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  const getProfile = useCallback(async () => {
      
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, last_name, street_address, province, country, postal_code, phone_number`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setfName(data.first_name)
        setlName(data.last_name)
        setStreet(data.street_address)
        setNumber(data.phone_number)
        setProvince(data.province)
        setCountry(data.country)
        setPostalCode(data.postal_code)
      }
    } catch (error) {
        console.log(error)
    //   alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])
  useEffect(() => {
    getProfile()
    getCreditCard()
  }, [user, getProfile])

  async function submitPayment({cardNumber, cardName, expiry, securityCode}){
    try{
        setLoading(true)
        const { error } = await supabase.from('payments').upsert({
            id:user?.id,
            credit_card_number: cardNumber,
            card_name: cardName,
            card_expiry: expiry,
            card_code: securityCode
        })
        if(error) console.log(error)
        // alert("Profile Updated!")
    }catch(error){
        alert("Error uploading data")
    }finally{
        setLoading(false)
    }
  }
  return (
    <>
        <div className="flex">
            <div className="table-container">
                <h2>Winning Bidder</h2>
                <table className="mt-15">
                    <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td>{fname}</td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td>{lname}</td>
                        </tr>
                        <tr>
                            <td>Street:</td>
                            <td>{street}</td>
                        </tr>
                        <tr>
                            <td>Number:</td>
                            <td>{Number}</td>
                        </tr>
                        <tr>
                            <td>Province:</td>
                            <td>{province}</td>
                        </tr>
                        <tr>
                            <td>Country:</td>
                            <td>{country}</td>
                        </tr>
                        <tr>
                            <td>Postal Code:</td>
                            <td>{postalCode}</td>
                        </tr>
                        <tr>
                            <td>Total Cost:</td>
                            <td>{totalcost}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="table-container">
                <h2>Credit Card</h2>
                <table className="mt-15">
                    <tbody>
                        <tr>
                            <td>Credit Card Number:</td>
                            <td>            
                                <input type="text"
                                placeholder="0000-0000-0000-0000"
                                value={cardNumber}
                                name="CardNumber"
                                onChange={ev => setCardNumber(ev.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Name on Card:</td>
                            <td>            
                                <input type="text"
                                placeholder="John Doe"
                                value={cardName}
                                name="CardName"
                                onChange={ev => setCardName(ev.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Expiry Date:</td>
                            <td>            
                                <input type="text"
                                placeholder="00/00"
                                value={expiry}
                                name="Expiry"
                                onChange={ev => setExpiry(ev.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Security Code:</td>
                            <td>            
                                <input type="text"
                                placeholder="000"
                                value={securityCode}
                                name="SecurityCode"
                                onChange={ev => setSecurityCode(ev.target.value)}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                    <button className="custombutton"
                        onClick={() => submitPayment({cardNumber, cardName, expiry, securityCode})}>
                        Submit
                    </button>
                </div>
        </div>
    </>
  );
}