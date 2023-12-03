"use client"
import { useSearchParams } from 'next/navigation'
export default function receipt() {
    const searchParams = useSearchParams()
    const date = new Date(parseInt(searchParams.get("timestamp")));
    const options = { day: 'numeric', year: 'numeric', month: 'long', hour: 'numeric',minute: 'numeric',second: 'numeric', };

    return (
    <div className='ml-20'>
        Here is your receipt for your recent transaction
        <table className="mt-4">
            <tbody className="space-x-4">
                        <tr>
                            <td className="p-2">First Name:</td>
                            <td className="p-2">{searchParams.get("fname")}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Last Name:</td>
                            <td className="p-2">{searchParams.get("lname")}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Street:</td>
                            <td className="p-2">{searchParams.get("street")}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Number:</td>
                            <td className="p-2">{searchParams.get("Number")}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Province:</td>
                            <td className="p-2">{searchParams.get("province")}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Country:</td>
                            <td className="p-2">{searchParams.get("country")}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Postal Code:</td>
                            <td className="p-2">{searchParams.get("postalCode")}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Total Cost:</td>
                            <td className="p-2">${searchParams.get("totalcost")}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Payment Made:</td>
                            <td className="p-2">{date.toLocaleDateString('en-US', options)}</td>
                        </tr>
                    </tbody>

        </table>
    </div>
  ) 
}