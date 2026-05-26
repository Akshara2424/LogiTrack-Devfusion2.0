// app/dashboard/agent/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function AgentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "agent") {
      router.push("/login");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#faf8ff" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-transparent border-t-blue-600"
        />
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "agent") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
      style={{ backgroundColor: "#faf8ff" }}
    >
      {/* Header */}
      <div className="bg-white border-b-2" style={{ borderColor: "#e1e2ed" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl font-bold"
            style={{ color: "#004ac6", fontFamily: "Quicksand" }}
          >
            🚚 Delivery Agent Dashboard
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-6 py-2 rounded-2xl font-bold text-white transition-all"
            style={{
              backgroundColor: "#004ac6",
              fontFamily: "Quicksand",
            }}
          >
            Sign Out
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-lg"
          style={{
            boxShadow: "0 20px 60px rgba(0, 84, 219, 0.12)",
          }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "#191b23", fontFamily: "Quicksand" }}
          >
            Welcome, {session?.user?.name}! 👋
          </h2>
          <p
            className="text-lg mb-6"
            style={{ color: "#434655", fontFamily: "Quicksand", fontWeight: 500 }}
          >
            Email: {session?.user?.email}
          </p>
          <p
            className="text-base"
            style={{ color: "#434655", fontFamily: "Quicksand" }}
          >
            🚀 Agent dashboard with delivery management, route optimization, and earnings tracking coming soon!
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          {[
            { title: "Today's Deliveries", value: "0", icon: "📦" },
            { title: "Completed", value: "0", icon: "✅" },
            { title: "Earnings Today", value: "$0.00", icon: "💵" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6"
              style={{
                boxShadow: "0 4px 12px rgba(0, 84, 219, 0.08)",
              }}
            >
              <p className="text-4xl mb-2">{stat.icon}</p>
              <p
                className="text-sm font-bold"
                style={{ color: "#434655", fontFamily: "Quicksand" }}
              >
                {stat.title}
              </p>
              <p
                className="text-2xl font-bold mt-2"
                style={{ color: "#004ac6", fontFamily: "Quicksand" }}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
