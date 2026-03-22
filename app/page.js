'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState(null)
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
      setSession(data.session)
      setMessage('')
    }
  }

  if (session) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Kati & Tills Einkaufszettel</h1>
        <p>Willkommen.</p>

        <div style={{ display: 'flex', gap: 12 }}>
          <a href="/lebensmittel">Lebensmittel</a>
          <a href="/drogerie">Drogerie</a>
          <a href="/sonstiges">Sonstiges</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Kati & Tills Einkaufszettel</h1>

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
