'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage('Fehler: ' + error.message)
      return
    }

    if (data.session) {
      setMessage('Login erfolgreich')
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Dalkowski Einkaufszettel</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Passwort"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={login}>Login</button>

      <br /><br />
      <div>{message}</div>
    </main>
  )
}
