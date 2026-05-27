// app/customer/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Plus, Package } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

export default function CustomerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated" && session?.user?.role !== "customer") {
      router.push("/login");
    }
  }, [status, session, router]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    if (product.stock > 0) {
      setCart([...cart, product]);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8ff]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 rounded-full border-4 border-transparent border-t-[#004ac6]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff]">
      {/* Header */}
      <div className="bg-white border-b-2 sticky top-0 z-50" style={{ borderColor: "#e1e2ed" }}>
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold" style={{ color: "#004ac6", fontFamily: "Quicksand" }}>
              LogiTrack
            </h1>
            <span className="text-xl text-gray-500">Shop</span>
          </div>

          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowCart(true)}
              className="flex items-center gap-3 px-6 py-3 rounded-3xl text-lg font-semibold relative hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              Cart <span className="bg-[#004ac6] text-white text-sm px-2.5 py-0.5 rounded-full">{cart.length}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-6 py-3 rounded-3xl font-bold text-white transition-all"
              style={{ backgroundColor: "#004ac6" }}
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h2 className="text-5xl font-bold text-gray-900">Welcome back, {session?.user?.name?.split(" ")[0]}! 👋</h2>
          <p className="text-xl text-gray-600 mt-3">Browse our products and place your order</p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl overflow-hidden card hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 bg-gray-100">
                <Image 
                  src={product.image || "/images/package-delivered.png"} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                />
                {product.stock < 10 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Only {product.stock} left
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                <p className="text-gray-500 mt-1">{product.category}</p>

                <div className="flex items-end justify-between mt-8">
                  <div>
                    <p className="text-4xl font-bold text-[#004ac6]">₹{product.price}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="flex items-center gap-2 bg-[#004ac6] text-white px-6 py-3 rounded-2xl font-semibold disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5" /> Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex justify-end">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="bg-white w-full max-w-lg h-full overflow-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold">Your Cart</h2>
                <button onClick={() => setShowCart(false)} className="text-3xl">✕</button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-20 h-20 mx-auto text-gray-300" />
                  <p className="text-xl text-gray-500 mt-6">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {cart.map((item, i) => (
                    <div key={i} className="flex gap-5 border-b pb-6 mb-6">
                      <div className="w-24 h-24 bg-gray-100 rounded-2xl relative overflow-hidden">
                        <Image src={item.image} alt="" fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-[#004ac6] font-bold text-xl">₹{item.price}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-6 border-t">
                    <div className="flex justify-between text-2xl font-bold mb-8">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <button 
                      onClick={() => router.push("/customer/checkout")}
                      className="w-full py-5 bg-[#004ac6] text-white text-xl font-semibold rounded-3xl"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}