import React, { useState } from 'react'
import { Card } from './Card'

interface AdminLoginProps {
  className?: string | undefined
  handleLogin: (e: React.FormEvent<HTMLFormElement>, password: string) => void
}

export function AdminLogin(props: AdminLoginProps) {
  const [password, setPassword] = useState('')

  return (
    <>
      <Card>
        <form onSubmit={(e) => props.handleLogin(e, password)}>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Admin-Passwort:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="************"
          />
          <button
            type="submit"
            className={
              'w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600'
            }
          >
            Login
          </button>
        </form>
      </Card>
    </>
  )
}
