import { FormEvent, useEffect, useState } from 'react'
import { useMutation, useQuery } from '../../convex/_generated/react'

export default function AdminPage() {
  const logs = useQuery('logs:get') || []

  const [newMessageText, setNewMessageText] = useState('')
  const sendMessage = useMutation('sendMessage')

  const [name, setName] = useState('user')

  useEffect(() => {
    setName('User ' + Math.floor(Math.random() * 10000))
  }, [])

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault()
    setNewMessageText('')
    await sendMessage(newMessageText, name)
  }
  return (
    <main>
      <h1>Convex Chat</h1>
      <p className="badge">
        <span>{name}</span>
      </p>
      <ul>
        {logs.map((log) => (
          <li key={log._id.toString()}>
            <span>{log.timestamp}:</span>
            <span>{log.sender}</span>
            <span>{new Date(log._creationTime).toLocaleTimeString()}</span>
            <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          value={newMessageText}
          onChange={(event) => setNewMessageText(event.target.value)}
          placeholder="Write a message…"
        />
        <input type="submit" value="Send" disabled={!newMessageText} />
      </form>
    </main>
  )
}
