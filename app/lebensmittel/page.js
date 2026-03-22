'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LebensmittelPage() {
  const [newItem, setNewItem] = useState('')

  const addItem = async () => {
    if (!newItem.trim()) return

    await supabase.from('shopping_items').insert({
      name: newItem,
      category: 'lebensmittel',
    })

    setNewItem('')
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Lebensmittel</h1>

      <input
        placeholder="Neuer Eintrag"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Hinzufügen</button>

      <br /><br />
      <a href="/">← Zurück</a>
    </main>
  )
}
