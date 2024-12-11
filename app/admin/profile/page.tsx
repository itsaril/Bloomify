'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

type Profile = {
  name: string
  email: string
  phone: string
  address: string
  imageUrl: string
}

export default function BuyerProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'BUYER') {
      router.push('/login')
    }
  }, [status, session, router])

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/profile')
      const data = await response.json()
      setProfile(data.profile)
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
    if (response.ok) {
      setIsEditing(false)
    }
  }

  if (status === 'loading' || !profile) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Access Denied</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1">Address</label>
            <textarea
              id="address"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <img src={profile.imageUrl} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  )
}

