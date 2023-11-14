import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ForwardAuction from '@/app/myauctions/forward-auction'

export default async function DutchAuction({ params: { id } }) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // return dutch auction if id exists and is published (public)
    const {data: forward_auctions} = await supabase.from('forward_auction').select("*").eq('id', id).eq('published', true).single();
    if(forward_auctions === null){
        return <h1>This auction either does not exist or is private</h1>
    } else {
        return (
            <div>
                <h1>A Forward Auction</h1>
                <ForwardAuction session={session} data={[forward_auctions]} />
            </div>
        )
    }
}