import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const flowers = await prisma.flower.findMany()
  return NextResponse.json({ flowers })
}

