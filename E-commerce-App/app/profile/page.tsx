'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface User {
  email: string
  username: string
  phoneNumber: string
}

export default function Profile() {
  const [user, setUser] = useState<User>({ email: '', username: '', phoneNumber: '' })
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser)
      setUser(parsedUser)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('currentUser', JSON.stringify(user))
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map((u: User) => u.email === user.email ? user : u)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    toast({
      title: "Success",
      description: "Profile updated successfully",
    })
  }

  if (!user.email) {
    return null // or a loading spinner
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={user.email}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={user.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">Update Profile</Button>
        </form>
      </div>
    </Layout>
  )
}

