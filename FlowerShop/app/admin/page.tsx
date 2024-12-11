'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/login')
    }
  }, [status, session, router])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data.users)
    }
    fetchUsers()
  }, [])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Access Denied</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Manage Flowers</h3>
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
          Add New Flower
        </button>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Users</h3>
        <ul className="space-y-2">
          {users.map((user: any) => (
            <li key={user.id} className="bg-white p-4 rounded shadow">
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

