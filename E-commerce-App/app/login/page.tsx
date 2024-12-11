'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the login data to your backend for authentication
    console.log('Login data:', formData)
    if (formData.email === 'admin@example.com' && formData.password === 'adminpassword') {
      toast({
        title: "Success",
        description: "Logged in as admin",
      })
      localStorage.setItem('isAdmin', 'true') // Set admin flag
      localStorage.setItem('currentUser', JSON.stringify({ email: formData.email, username: 'Admin' }))
      router.push('/admin')
    } else {
      // Check if the user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password)
      if (user) {
        toast({
          title: "Success",
          description: "Logged in successfully",
        })
        localStorage.setItem('isAdmin', 'false') // Set non-admin flag
        localStorage.setItem('currentUser', JSON.stringify(user))
        router.push('/catalog')
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    </Layout>
  )
}

