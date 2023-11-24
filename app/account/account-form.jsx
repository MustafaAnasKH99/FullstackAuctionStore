'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import '../globals.css'

export default function AccountForm({ session }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [fname,setfName] = useState(null);
  const [lname,setlName] = useState(null);
  const [street,setStreet] = useState(null);
  const [Number,setNumber] = useState(null);
  const [province,setProvince] = useState(null);
  const [country,setCountry] = useState(null);
  const [postalCode,setPostalCode] = useState(null);

  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url, first_name, last_name, street_address, province, country, postal_code, phone_number`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setfName(data.first_name)
        setlName(data.last_name)
        setStreet(data.street_address)
        setNumber(data.province)
        setProvince(data.country)
        setCountry(data.postal_code)
        setPostalCode(data.phone_number)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ username, website, avatar_url, fname, lname, street, Number, province, country, postalCode }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        first_name: fname, 
        last_name: lname, 
        street_address: street, 
        province: province, 
        country: country, 
        postal_code: postalCode,
        phone_number: Number,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      console.log(error)
      // alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="shadow-md rounded-md p-8">
        <div className="">
          <div className="">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="fullName" className="block mb-2 text-gray-600">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullname || ''}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-gray-600">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="website" className="block mb-2 text-gray-600">Website</label>
                <input
                  id="website"
                  type="url"
                  value={website || ''}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block mb-2 text-gray-600">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={fname || ''}
                  onChange={(e) => setfName(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-gray-600">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={lname || ''}
                  onChange={(e) => setlName(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-600">Email</label>
                <input
                  id="email"
                  type="text"
                  value={session?.user.email}
                  disabled
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="streetAddress" className="block mb-2 text-gray-600">Street Address</label>
                <input
                  id="streetAddress"
                  type="text"
                  value={street || ''}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="province" className="block mb-2 text-gray-600">Province</label>
                <input
                  id="province"
                  type="text"
                  value={province || ''}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="country" className="block mb-2 text-gray-600">Country</label>
                <input
                  id="country"
                  type="text"
                  value={country || ''}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block mb-2 text-gray-600">Postal Code</label>
                <input
                  id="postalCode"
                  type="text"
                  value={postalCode || ''}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-gray-600">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="text"
                  value={Number || ''}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-8/12 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            className="rounded-full hover:bg-light_green font-semibold"
            onClick={() =>
              updateProfile({
                fullname,
                username,
                website,
                avatar_url,
                fname,
                lname,
                street,
                Number,
                province,
                country,
                postalCode,
              })
            }
            disabled={loading}
          >
            {loading ? "Loading..." : "Update"}
          </button>

          {/* <form action="/auth/signout" method="post">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              type="submit"
            >
              Sign out
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
}