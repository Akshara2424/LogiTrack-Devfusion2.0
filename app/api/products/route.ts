// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== 'business') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const products = await Product.find({ businessOwner: session.user.id }).sort({ createdAt: -1 });
  
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== 'business') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  
  await connectDB();
  
  const product = await Product.create({
    ...data,
    businessOwner: session.user.id,
  });

  return NextResponse.json(product, { status: 201 });
}