'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Order submitted:', formData)
    // Here you would typically send the order data to your backend
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select id="country" name="country" value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })} required>
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full">Place Order</Button>
      </form>
    </Layout>
  )
}

