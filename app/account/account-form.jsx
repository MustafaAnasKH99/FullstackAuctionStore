'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
          type="text"
          value={fname || ''}
          onChange={(e) => setfName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastname">Last Name</label>
        <input
          id="lastname"
          type="text"
          value={lname || ''}
          onChange={(e) => setlName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          id="phonenumber"
          type="text"
          value={Number || ''}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="streetaddress">Street Address</label>
        <input
          id="streetaddress"
          type="text"
          value={street || ''}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="province">Province</label>
        <input
          id="province"
          type="text"
          value={province || ''}
          onChange={(e) => setProvince(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          value={country || ''}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="postalcode">Postal Code</label>
        <input
          id="postalcode"
          type="text"
          value={postalCode || ''}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>



      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ fullname, username, website, avatar_url, fname, lname, street, Number, province, country, postalCode })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}