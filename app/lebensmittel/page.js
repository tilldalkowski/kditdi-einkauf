'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LebensmittelPage() {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([])

  const loadItems = async () => {
    const { data } = await supabase
      .from('shopping_items')
      .select('*')
      .eq('category', 'lebensmittel')
      .order('created_at', { ascending: true })

    setItems(data || [])
  }

  useEffect(() => {
    loadItems()
  }, [])

  const addItem = async () => {
    if (!newItem.trim()) return

    await supabase.from('shopping_items').insert({
      name: newItem.trim(),
      category: 'lebensmittel',
    })

    setNewItem('')
    loadItems()
  }

  const deleteItem = async (id) => {
    await supabase.from('shopping_items').delete().eq('id', id)
    loadItems()
  }

  const editItem = async (id, currentName) => {
    const updatedName = window.prompt('Eintrag bearbeiten', currentName)
    if (!updatedName || !updatedName.trim()) return

    await supabase
      .from('shopping_items')
      .update({ name: updatedName.trim() })
      .eq('id', id)

    loadItems()
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Lebensmittel</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Neuer Eintrag"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addItem()
          }}
        />
        <button onClick={addItem} style={{ marginLeft: 8 }}>
          Hinzufügen
        </button>
      </div>

      <ul style={{ paddingLeft: 20 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            {item.name}
            <button onClick={() => editItem(item.id, item.name)} style={{ marginLeft: 8 }}>
              Bearbeiten
            </button>
            <button onClick={() => deleteItem(item.id)} style={{ marginLeft: 8 }}>
              Löschen
            </button>
          </li>
        ))}
      </ul>

      <br />
      <a href="/">← Zurück</a>
    </main>
  )
}
