import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import MyAuctions from './my-auctions'

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {data: auctions, error} = await supabase
  .from('dutch_auction')
  .select("*").eq('created_by', session.user.id);
  const {data: forward_auction} = await supabase.from('forward_auction').select("*").eq('created_by', session.user.id);
  return <MyAuctions session={session} data={auctions} forward_auction={forward_auction} />
}