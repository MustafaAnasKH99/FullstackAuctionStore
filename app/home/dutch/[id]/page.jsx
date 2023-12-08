import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import MyAuctions from '@/app/myauctions/my-auctions'
import SingleDutchAuction from './single-dutch-auction'

export default async function DutchAuction({ params: { id } }) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // return dutch auction if id exists and is published (public)
    const {data: dutch_auctions} = await supabase.from('dutch_auction').select("*").eq('id', id).eq('published', true).single();
    if(dutch_auctions === null){
      return <h1>This auction either does not exist or is private</h1>
  } else {
      return (
          <div>
              <SingleDutchAuction session={session} dutch_data={[dutch_auctions]} />
          </div>
      )
  }
}