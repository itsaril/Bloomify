import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blooming Delights',
  description: 'Your one-stop shop for beautiful flowers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-pink-600">Blooming Delights</h1>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-pink-600 text-white">
            <div className="container mx-auto px-4 py-6 text-center">
              <p>&copy; 2023 Blooming Delights. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

