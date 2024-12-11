'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  color: string
  imageUrl: string
  quantity: number
}

interface Order {
  id: string
  userEmail: string
  date: string
  total: number
  status: string
  items: CartItem[]
  shippingInfo: {
    address: string
    city: string
    zipCode: string
  }
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState({ address: '', city: '', zipCode: '' })
  const router = useRouter()

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  const placeOrder = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const userEmail = currentUser.email

    if (!userEmail) {
      toast({
        title: "Error",
        description: "You must be logged in to place an order",
        variant: "destructive",
      })
      router.push('/login')
      return
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      userEmail: userEmail,
      items: cart,
      shippingInfo,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
      status: 'Pending'
    }

    // Get existing orders from localStorage
    const existingOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]')

    // Add the new order
    const updatedOrders = [...existingOrders, newOrder]

    // Save updated orders back to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders))

    // Clear the cart
    localStorage.removeItem('cart')
    setCart([])

    toast({
      title: "Success",
      description: "Order placed successfully",
    })
    router.push('/order-history')
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Cart</h1>
      {step === 1 && (
        <>
          {cart.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                  <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-md" />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Color: {item.color}</p>
                    <p className="text-pink-600 font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} variant="outline" size="icon">-</Button>
                    <span>{item.quantity}</span>
                    <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} variant="outline" size="icon">+</Button>
                  </div>
                </div>
              ))}
              <div className="text-right">
                <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
                <Button onClick={() => setStep(2)} className="mt-4">Proceed to Checkout</Button>
              </div>
            </div>
          )}
        </>
      )}
      {step === 2 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingInfoChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingInfoChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleShippingInfoChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">Review Order</Button>
          </form>
        </div>
      )}
      {step === 3 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bold">Shipping Address:</h3>
            <p>{shippingInfo.address}</p>
            <p>{shippingInfo.city}, {shippingInfo.zipCode}</p>
          </div>
          <Button onClick={placeOrder} className="w-full mt-4">Place Order</Button>
        </div>
      )}
    </Layout>
  )
}

