import React, { useEffect, useState } from 'react'
import { CenteringContainer } from '../components/CenteringContainer'
import { Footer } from '../components/Footer'
import { useAdminPasswordQuery } from '../queries/UseAdminPasswordQuery'
import { AdminLogin } from '../components/AdminLogin'
import { AdminDashboard } from '../components/AdminDashboard'

export function AdminPage() {
  const [password, setPassword] = useState<string>('')
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const {
    data: adminPasswordData,
    status: adminPasswordStatus,
    error: adminPasswordError
  } = useAdminPasswordQuery(password)

  useEffect(() => {
    if (adminPasswordStatus === 'success') {
      setLoggedIn(adminPasswordData)
    }
    if (adminPasswordStatus === 'error' && adminPasswordError) {
      console.error(adminPasswordError.name)
    }
  }, [adminPasswordData, adminPasswordStatus, adminPasswordError])

  const handleLogin = (
    e: React.FormEvent<HTMLFormElement>,
    password: string
  ) => {
    e.preventDefault()
    setPassword(password)
  }

  return (
    <>
      <CenteringContainer>
        {loggedIn ? (
          <AdminDashboard password={password} />
        ) : (
          <AdminLogin handleLogin={handleLogin} />
        )}
      </CenteringContainer>
      <Footer />
    </>
  )
}
