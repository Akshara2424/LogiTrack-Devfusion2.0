"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, Package, TrendingUp, MapPin, AlertCircle, Users } from "lucide-react";

export default function BusinessDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || session?.user?.role !== "business") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center text-2xl">Loading LogiTrack...</div>;

  return (
    <div className="min-h-screen bg-[#faf8ff]">
      {/* Navbar */}
      <nav className="bg-white border-b px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#004ac6] rounded-2xl flex items-center justify-center text-white text-2xl font-bold">LT</div>
          <h1 className="text-3xl font-bold text-gray-900">LogiTrack</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-3xl shadow-sm">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-xl">👋</div>
            <div>
              <p className="font-semibold">Alex Rivera</p>
              <p className="text-xs text-gray-500">Fleet Ops Central</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.1 }} className="p-3 hover:bg-gray-100 rounded-2xl">
            <AlertCircle className="w-6 h-6 text-orange-500" />
          </motion.button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r min-h-screen p-6">
          <div className="space-y-1">
            {[
              { label: "Dashboard", active: true, icon: "📊" },
              { label: "Live Tracking", icon: "🚛" },
              { label: "Shipments", icon: "📦" },
              { label: "Fleet Management", icon: "🛠️" },
              { label: "Settings", icon: "⚙️" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 8 }}
                className={`flex items-center gap-4 px-6 py-4 rounded-3xl text-lg font-medium cursor-pointer transition-all ${
                  item.active ? "bg-[#004ac6] text-white" : "hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-4xl font-bold text-gray-900">Business Overview</h2>
            <p className="text-gray-600 mt-2 text-lg">Welcome back, manager. Your fleet is performing at <span className="text-green-600 font-bold">98% efficiency</span> today.</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { title: "Total Shipments", value: "248", change: "+12%", icon: Package, color: "blue" },
              { title: "Active Trucks", value: "18", change: "Live", icon: Truck, color: "orange" },
              { title: "Delivered", value: "231", change: "99.2%", icon: TrendingUp, color: "green" },
              { title: "Revenue", value: "$1.24K", change: "Peak", icon: TrendingUp, color: "purple" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <stat.icon className={`w-12 h-12 text-[#004ac6]`} />
                  <span className="text-green-500 font-medium">{stat.change}</span>
                </div>
                <p className="text-5xl font-bold mt-8 text-gray-900">{stat.value}</p>
                <p className="text-gray-500 mt-2 text-lg">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Route Optimization */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-8 shadow"
            >
              <h3 className="text-2xl font-semibold flex items-center gap-3 mb-6">
                <MapPin className="text-[#fd761a]" /> Route Optimization
              </h3>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8">
                <p className="text-xl font-semibold">Optimization Active</p>
                <p className="mt-3 text-gray-600">Rerouting 14 trucks to avoid heavy traffic on I-95 South.</p>
              </div>
            </motion.div>

            {/* Top Categories */}
            <div className="bg-white rounded-3xl p-8 shadow">
              <h3 className="text-2xl font-semibold mb-6">Top Freight Categories</h3>
              <div className="space-y-6">
                {["FAST", "BULK", "COLD", "HAZ"].map((cat, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.02 }} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <div>
                      <p className="font-bold">{cat}</p>
                      <p className="text-sm text-gray-500">Last-mile ecommerce delivery specialists</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">4,210 Active</p>
                      <p className="text-green-600 text-sm">Stable</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}