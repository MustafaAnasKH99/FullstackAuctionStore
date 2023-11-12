"use client"
import axios from "axios";
import styled from "styled-components";
import {useEffect, useState} from "react";

export default function CartPage() {
  const [fname,setfName] = useState('xxx');
  const [lname,setlName] = useState('yyy');
  const [street,setStreet] = useState('zzz');
  const [Number,setNumber] = useState('kkk');
  const [province,setProvince] = useState('www');
  const [country,setCountry] = useState('ccc');
  const [postalCode,setPostalCode] = useState('ddd');
  const [totalcost,setTotalcost] = useState('kkk');

  const [cardNumber,setCardNumber] = useState('');
  const [cardName,setCardName] = useState('');
  const [expiry,setExpiry] = useState('');
  const [securityCode,setSecurityCode] = useState('');


//   useEffect(() => {
//       axios.get('/api/userinfo')
//         .then(response => {
//             set user attributes here
//         })
//   });
  function submitPayment(){

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
                        onClick={submitPayment}>
                        Submit
                    </button>
                </div>
        </div>
    </>
  );
}