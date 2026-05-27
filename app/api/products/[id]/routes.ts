// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { auth } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  await connectDB();

  const product = await Product.findOneAndUpdate(
    { _id: params.id, businessOwner: session.user.id },
    data,
    { new: true }
  );

  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await Product.findOneAndDelete({ _id: params.id, businessOwner: session.user.id });
  
  return NextResponse.json({ message: "Product deleted" });
}