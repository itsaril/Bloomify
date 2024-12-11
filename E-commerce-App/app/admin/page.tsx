'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Product {
  id: number
  name: string
  price: number
  color: string
  imageUrl: string
}

interface Order {
  items: Array<Product & { quantity: number }>
  shippingInfo: {
    address: string
    city: string
    zipCode: string
  }
  total: number
  date: string
  status: string
}

export default function AdminPanel() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState({ name: '', price: '', color: '', imageUrl: '' })
  const [colors, setColors] = useState<string[]>([])
  const [newColor, setNewColor] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (!isAdmin) {
      toast({
        title: "Error",
        description: "You don't have permission to access this page",
        variant: "destructive",
      })
      router.push('/login')
    }

    const storedProducts = localStorage.getItem('products')
    const storedColors = localStorage.getItem('colors')
    const storedOrders = localStorage.getItem('orders')

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }

    if (storedColors) {
      setColors(JSON.parse(storedColors))
    }

    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [router])

  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleAddProduct = () => {
    const price = parseFloat(newProduct.price)
    if (isNaN(price)) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      })
      return
    }
    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      price: price,
      color: newProduct.color,
      imageUrl: newProduct.imageUrl || '/placeholder.svg?height=200&width=200'
    }
    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    saveToLocalStorage('products', updatedProducts)
    setNewProduct({ name: '', price: '', color: '', imageUrl: '' })
    toast({
      title: "Success",
      description: "Product added successfully",
    })
  }

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id)
    setProducts(updatedProducts)
    saveToLocalStorage('products', updatedProducts)
    toast({
      title: "Success",
      description: "Product deleted successfully",
    })
  }

  const handleAddColor = () => {
    if (newColor && !colors.includes(newColor)) {
      const updatedColors = [...colors, newColor]
      setColors(updatedColors)
      saveToLocalStorage('colors', updatedColors)
      setNewColor('')
      toast({
        title: "Success",
        description: "Color added successfully",
      })
    }
  }

  const handleDeleteColor = (color: string) => {
    const updatedColors = colors.filter(c => c !== color)
    setColors(updatedColors)
    saveToLocalStorage('colors', updatedColors)
    toast({
      title: "Success",
      description: "Color deleted successfully",
    })
  }

  const handleSendOrder = (order: Order) => {
    const updatedOrders = orders.map(o => 
      o === order ? { ...o, status: 'Sent' } : o
    )
    setOrders(updatedOrders)
    saveToLocalStorage('orders', updatedOrders)
    toast({
      title: "Success",
      description: "Order marked as sent",
    })
  }

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image src={product.imageUrl} alt={product.name} width={50} height={50} className="rounded-md" />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteProduct(product.id)} variant="destructive">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4 space-y-4">
            <h3 className="text-xl font-semibold">Add New Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleProductChange}
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleProductChange}
                  placeholder="Price"
                  type="number"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  name="color"
                  value={newProduct.color}
                  onChange={handleProductChange}
                  placeholder="Color"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={handleProductChange}
                  placeholder="Image URL"
                />
              </div>
            </div>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Manage Colors</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {colors.map(color => (
              <div key={color} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span>{color}</span>
                <button onClick={() => handleDeleteColor(color)} className="ml-2 text-red-500">&times;</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              placeholder="New color"
            />
            <Button onClick={handleAddColor}>Add Color</Button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedOrder(order)}>View Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Order Details</DialogTitle>
                          <DialogDescription>
                            Order placed on {new Date(order.date).toLocaleString()}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <h3 className="font-bold">Items:</h3>
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between">
                              <span>{item.name} x {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="mt-2 font-bold flex justify-between">
                            <span>Total:</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h3 className="font-bold">Shipping Address:</h3>
                          <p>{order.shippingInfo.address}</p>
                          <p>{order.shippingInfo.city}, {order.shippingInfo.zipCode}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {order.status === 'Pending' && (
                      <Button onClick={() => handleSendOrder(order)} className="ml-2">Send</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}

