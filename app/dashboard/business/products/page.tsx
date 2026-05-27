"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Edit2, Trash2, Package } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
  category: string;
}

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "", price: "", stock: "", sku: "", category: "", image: ""
  });

  useEffect(() => {
    if (status === "unauthenticated" || session?.user?.role !== "business") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchProducts();
    }
  }, [session, status, router]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingProduct 
      ? `/api/products/${editingProduct._id}` 
      : `/api/products`;

    const method = editingProduct ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setShowForm(false);
    setEditingProduct(null);
    setFormData({ name: "", price: "", stock: "", sku: "", category: "", image: "" });
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      sku: product.sku,
      category: product.category,
      image: product.image
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center text-2xl">Loading LogiTrack...</div>;

  return (
    <div className="p-10 bg-[#faf8ff] min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">Product Catalogue</h1>
          <p className="text-xl text-gray-600 mt-2">Manage your inventory</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-3 bg-[#004ac6] text-white px-8 py-4 rounded-3xl text-lg font-semibold"
        >
          <Plus className="w-6 h-6" />
          New Product
        </motion.button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card bg-white p-8"
          >
            <div className="relative h-48 bg-gray-100 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
              {product.image && product.image.trim() ? (
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="text-6xl">📦</div>
              )}
            </div>

            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="text-gray-500">SKU: {product.sku}</p>

            <div className="flex justify-between mt-6">
              <div>
                <p className="text-4xl font-bold text-[#004ac6]">₹{product.price}</p>
                <p className="text-sm text-gray-500">Price</p>
              </div>
              <div>
                <p className={`text-4xl font-bold ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  {product.stock}
                </p>
                <p className="text-sm text-gray-500">In Stock</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => handleEdit(product)} className="flex-1 py-4 border border-gray-300 rounded-2xl hover:bg-gray-50">
                <Edit2 className="inline w-5 h-5" /> Edit
              </button>
              <button onClick={() => handleDelete(product._id)} className="flex-1 py-4 text-red-600 hover:bg-red-50 rounded-2xl">
                <Trash2 className="inline w-5 h-5" /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-10 w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-8">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full p-4 rounded-2xl border" />
              <div className="grid grid-cols-2 gap-6">
                <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required className="w-full p-4 rounded-2xl border" />
                <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required className="w-full p-4 rounded-2xl border" />
              </div>
              <input type="text" placeholder="SKU" value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} required className="w-full p-4 rounded-2xl border" />
              <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-2xl border" />
              
              <button type="submit" className="w-full bg-[#004ac6] text-white py-4 rounded-3xl text-lg font-semibold">
                {editingProduct ? "Update Product" : "Create Product"}
              </button>
              <button type="button" onClick={() => {setShowForm(false); setEditingProduct(null);}} className="w-full py-4 text-gray-500">
                Cancel
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}