import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import PaymentForm from './payment-form'

export default async function Payment() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <PaymentForm session={session} />
    </div>
  ) 
}