import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import MyAuctions from './my-auctions'

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {data: auctions} = await supabase.from('dutch_auction').select("*")

  return <MyAuctions session={session} data={auctions} />
}