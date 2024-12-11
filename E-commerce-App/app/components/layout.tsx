'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, User, UserPlus, Menu, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    setIsLoggedIn(!!currentUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-pink-600">Bloom</Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link href="/catalog" className="text-gray-600 hover:text-pink-600 transition-colors">Catalog</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link href="/profile" className="text-gray-600 hover:text-pink-600 transition-colors">Profile</Link></li>
                  <li><Link href="/order-history" className="text-gray-600 hover:text-pink-600 transition-colors">Order History</Link></li>
                </>
              ) : (
                <>
                  <li><Link href="/about" className="text-gray-600 hover:text-pink-600 transition-colors">About</Link></li>
                  <li><Link href="/contact" className="text-gray-600 hover:text-pink-600 transition-colors">Contact</Link></li>
                </>
              )}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-600 hover:text-pink-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            {isLoggedIn ? (
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-6 w-6" />
              </Button>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-pink-600 transition-colors">
                  <User className="h-6 w-6" />
                </Link>
                <Link href="/register" className="text-gray-600 hover:text-pink-600 transition-colors">
                  <UserPlus className="h-6 w-6" />
                </Link>
              </>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <Link href="/catalog" className="text-gray-600 hover:text-pink-600 transition-colors">Catalog</Link>
                  {isLoggedIn ? (
                    <>
                      <Link href="/profile" className="text-gray-600 hover:text-pink-600 transition-colors">Profile</Link>
                      <Link href="/order-history" className="text-gray-600 hover:text-pink-600 transition-colors">Order History</Link>
                      <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Link href="/about" className="text-gray-600 hover:text-pink-600 transition-colors">About</Link>
                      <Link href="/contact" className="text-gray-600 hover:text-pink-600 transition-colors">Contact</Link>
                      <Link href="/register" className="text-gray-600 hover:text-pink-600 transition-colors">Register</Link>
                      <Link href="/login" className="text-gray-600 hover:text-pink-600 transition-colors">Login</Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
      <footer className="bg-gray-100 mt-auto">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">&copy; 2023 Bloom. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/terms" className="text-gray-600 hover:text-pink-600 transition-colors">Terms</Link>
            <Link href="/privacy" className="text-gray-600 hover:text-pink-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

