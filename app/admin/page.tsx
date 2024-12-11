import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-pink-600 mb-8">Welcome to Blooming Delights</h2>
      <div className="space-y-4">
        <Link href="/admin" className="block w-64 mx-auto bg-pink-600 text-white py-2 px-4 rounded-full hover:bg-pink-700 transition duration-300">
          Admin Login
        </Link>
        <Link href="/buyer" className="block w-64 mx-auto bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition duration-300">
          Buyer Login
        </Link>
        <Link href="/buyer/register" className="block w-64 mx-auto bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
          Buyer Register
        </Link>
      </div>
    </div>
  )
}

