import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const profile = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      phone: true,
      address: true,
      imageUrl: true,
    },
  })

  return NextResponse.json({ profile })
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, email, phone, address } = await req.json()

  const updatedProfile = await prisma.user.update({
    where: { email: session.user.email },
    data: { name, email, phone, address },
    select: {
      name: true,
      email: true,
      phone: true,
      address: true,
      imageUrl: true,
    },
  })

  return NextResponse.json({ profile: updatedProfile })
}

