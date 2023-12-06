"use client"
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
export default function PaymentForm({ session }) {
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [fname,setfName] = useState(null);
  const [lname,setlName] = useState(null);
  const [street,setStreet] = useState(null);
  const [Number,setNumber] = useState(null);
  const [province,setProvince] = useState(null);
  const [country,setCountry] = useState(null);
  const [postalCode,setPostalCode] = useState(null);
  const [totalcost,setTotalcost] = useState(searchParams.get("price"));

  const [cardNumber,setCardNumber] = useState('');
  const [cardName,setCardName] = useState('');
  const [expiry,setExpiry] = useState('');
  const [securityCode,setSecurityCode] = useState('');
  const [cardValid, setcardValid] = useState(true);
  const [cardEValid, setcardEValid] = useState(true);
  const [cardCValid, setcardCValid] = useState(true);

  const [receipt, setreceipt] = useState(null);

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
        console.log(error)
        alert("Error uploading data")
    }finally{

        setLoading(false)
    }
  }
  function checkCard(card){
    const validity = card.length === 16 && String(card).match("[0-9]{16}");
    if(validity){
        setcardValid(true)
    }else{
        setcardValid(false)
    }
    setCardNumber(card)
  }
  function checkExpiry(expiry){
    const validity = expiry.length === 5 && String(expiry).match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);
    if(validity){
        const date = new Date();
        const month = expiry.slice(0,2)
        const year = expiry.slice(3)
        if(parseInt(year) > date.getFullYear()-2000){
            setcardEValid(true)
        }else if(parseInt(year) === date.getFullYear()-2000 && parseInt(month) >=date.getMonth()+1){
            setcardEValid(true)
        }else{
            setcardEValid(false)
        }
    }else{
        setcardEValid(false)
    }
    setExpiry(expiry)
  }
  function checkCode(code){
    if(code.length === 3 && String(code).match("[0-9]{3}")){
        setcardCValid(true)
    }else{
        setcardCValid(false)
    }
    setSecurityCode(code)
  }
  return (
    <>
        <div className="flex">
            <div className="table-container mx-10">
                <h2 className="font-extrabold text-lg text-light_green mb-5">Winning Bidder</h2>
                <table className="mt-15 mr-20">
                    <tbody>
                        <tr>
                            <td className='font-bold'>First Name:</td>
                            <td>{fname}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Last Name:</td>
                            <td>{lname}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Street:</td>
                            <td>{street}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Postal Code:</td>
                            <td>{postalCode}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Province:</td>
                            <td>{province}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Country:</td>
                            <td>{country}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Number:</td>
                            <td>{Number}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Total Cost:</td>
                            <td>${totalcost}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="table-container w-100 ml-20">
                <h2 className="font-extrabold text-lg text-light_green mb-5">Payment Info</h2>
                <table className="mt-15">
                    <tbody>
                        <tr>
                            <td className='font-bold'>Credit Card Number:</td>
                            <td>            
                                <input type="text"
                                data-testid="ccf"
                                placeholder="0000-0000-0000-0000"
                                value={cardNumber}
                                name="CardNumber"
                                onChange={ev => checkCard(ev.target.value)} 
                                className='w-full'/>
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Name on Card:</td>
                            <td>            
                                <input type="text"
                                placeholder="John Doe"
                                value={cardName}
                                name="CardName"
                                onChange={ev => setCardName(ev.target.value)}
                                className='w-full'/>
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Expiry Date:</td>
                            <td>            
                                <input type="text"
                                placeholder="00/00"
                                value={expiry}
                                name="Expiry"
                                onChange={ev => checkExpiry(ev.target.value)}
                                className='w-full'/>
                            </td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Security Code:</td>
                            <td>            
                                <input type="text"
                                placeholder="000"
                                value={securityCode}
                                name="SecurityCode"
                                onChange={ev => checkCode(ev.target.value)}
                                className='w-full'/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                    
                {(!cardValid || !cardCValid || !cardEValid)&& 
                    <div className='bg-red-900' data-testid="error">
                        Error, Invalid Payment Details
                    </div>
                    ||
                    <div className="rounded-full text-center hover:bg-light_green font-semibold text-lg border border-white">
                        <Link 
                            href={{
                                pathname: "/receipt",
                                query: {
                                    "fname": fname,
                                    "lname": lname,
                                    "street": street,
                                    "Number": Number,
                                    "province": province,
                                    "country": country,
                                    "postalCode": postalCode,
                                    "totalcost": totalcost,
                                    "timestamp": Date.now()
                                }
                            }}
                            onClick={() => submitPayment({cardNumber, cardName, expiry, securityCode})}>
                            Submit
                        </Link>
                    </div>
                }
            </div>
        </div>
    </>
  );
}