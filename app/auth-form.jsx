'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function AuthForm() {
  
  const supabase = createClientComponentClient()
  
  return (
    <>
      <Auth
        supabaseClient={supabase}
      //   view="magic_link"
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={["google"]}
        showLinks={true}
        redirectTo="http://localhost:3000/auth/callback"
      />
    </>
  )
}