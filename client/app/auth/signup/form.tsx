'use client'

import { redirect } from "next/navigation"
import { useState } from "react"

export function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any[]>([])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()
    if (response.status === 201) {
      redirect('/')
    } else {
      setErrors(data.errors)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Signup</h1>
      <ul>
        {errors?.filter(e => !e.field).map(
          e => <li key={e.message}>{e.message}</li>
        )}
      </ul>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <ul>
          {errors?.filter(e => e.field === 'email').map(
            e => <li key={e.message}>{e.message}</li>
          )}
        </ul>
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <ul>
          {errors?.filter(e => e.field === 'password').map(
            e => <li key={e.message}>{e.message}</li>
          )}
        </ul>
      </div>
      <button>Signup</button>
    </form>
  )
}