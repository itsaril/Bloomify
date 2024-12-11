'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface Product {
  id: number
  name: string
  price: number
  color: string
  imageUrl: string
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedColor, setSelectedColor] = useState('all')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    const storedProducts = localStorage.getItem('products')
    const storedColors = localStorage.getItem('colors')

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }

    if (storedColors) {
      setColors(JSON.parse(storedColors))
    }
  }, [])

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedColor === 'all' || product.color === selectedColor)
    )
    .sort((a, b) => 
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    )

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    toast({
      title: "Success",
      description: `${product.name} added to cart`,
    })
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Catalog</h1>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search flowers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger id="color">
              <SelectValue placeholder="Select Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colors</SelectItem>
              {colors.map(color => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sort">Sort by Price</Label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
            <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="mx-auto mb-4 rounded-md object-cover" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">Color: {product.color}</p>
            <p className="text-xl font-bold text-pink-600 mb-4">${product.price.toFixed(2)}</p>
            <Button className="w-full" onClick={() => addToCart(product)}>Add to Cart</Button>
          </div>
        ))}
      </div>
    </Layout>
  )
}

