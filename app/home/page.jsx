import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Home from './myhome'
import MyAuctions from '../myauctions/my-auctions'

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {data: dutch_auction} = await supabase.from('dutch_auction').select("*").eq('published', true).is("accepted_bidder", null);
  const {data: forward_auction_data} = await supabase.from('forward_auction').select("*").eq('published', true);

  return <MyAuctions session={session} data={dutch_auction} forward_auction={forward_auction_data} />
}