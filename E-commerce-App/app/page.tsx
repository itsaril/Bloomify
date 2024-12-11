import Image from 'next/image'
import Link from 'next/link'
import Layout from './components/layout'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Layout>
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Bloom</h1>
        <p className="text-xl text-gray-600 mb-8">Delivering happiness, one flower at a time.</p>
        <Button asChild>
          <Link href="/catalog">Shop Now</Link>
        </Button>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Image src="/placeholder.svg?height=100&width=100" alt="Fresh Flowers" width={100} height={100} className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Fresh Flowers</h2>
          <p className="text-gray-600">Hand-picked daily for ultimate freshness.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Image src="/placeholder.svg?height=100&width=100" alt="Fast Delivery" width={100} height={100} className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Fast Delivery</h2>
          <p className="text-gray-600">Same-day delivery available.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Image src="/placeholder.svg?height=100&width=100" alt="Customization" width={100} height={100} className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Customization</h2>
          <p className="text-gray-600">Create your perfect bouquet.</p>
        </div>
      </section>
    </Layout>
  )
}

