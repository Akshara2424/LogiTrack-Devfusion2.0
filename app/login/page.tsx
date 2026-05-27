// app/login/page.tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if user is authenticated AND has a valid role
    if (status === "authenticated" && session?.user) {
      const role = session.user?.role;
      if (role === "business") {
        router.push("/dashboard/business");
      } else if (role === "agent") {
        router.push("/dashboard/agent");
      } else if (role === "customer") {
        router.push("/dashboard/customer");
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    }
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const leftPanelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const rightPanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const floatingBlobVariants = {
    animate: {
      y: [0, 20, 0],
      transition: { duration: 4, repeat: Infinity },
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-0"
      style={{ backgroundColor: "#faf8ff" }}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1 */}
        <motion.div
          variants={floatingBlobVariants}
          animate="animate"
          className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "#004ac6" }}
        />
        {/* Blob 2 */}
        <motion.div
          variants={floatingBlobVariants}
          animate="animate"
          className="absolute bottom-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: "#fd761a" }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10"
        style={{
          boxShadow: "0 20px 60px rgba(0, 84, 219, 0.12)",
        }}
      >
        {/* Left Panel - Branding */}
        <motion.div
          variants={leftPanelVariants}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: "#2563eb" }}
        >
          {/* Decorative circles */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: "#60a5fa", marginTop: "-100px", marginRight: "-100px" }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "#fd761a", marginBottom: "-100px", marginLeft: "-100px" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            {/* Logo/Title */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white" style={{ fontFamily: "Quicksand" }}>
                LogiTrack
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-blue-100"
              style={{ fontFamily: "Quicksand", fontWeight: 500 }}
            >
              Ready for your next delivery?
            </motion.p>

            {/* Character Illustration */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4"
            >
              <div
                className="w-48 h-48 rounded-3xl p-6 flex items-center justify-center relative"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              >
                <div className="text-center">
                  <p className="text-6xl mb-2">📦</p>
                  <p className="text-sm font-bold text-gray-800" style={{ fontFamily: "Quicksand" }}>
                    Delivery
                  </p>
                  <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: "Quicksand" }}>
                    Made Simple
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm text-blue-50 max-w-xs mt-4"
              style={{ fontFamily: "Quicksand", fontWeight: 500 }}
            >
              Fast, reliable, and transparent logistics management at your fingertips
            </motion.p>
          </div>
        </motion.div>

        {/* Right Panel - Login Form */}
        <motion.div
          variants={rightPanelVariants}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
        >
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-10">
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#191b23", fontFamily: "Quicksand" }}
              >
                Welcome Back
              </h2>
              <p
                className="text-base mt-2"
                style={{ color: "#434655", fontFamily: "Quicksand", fontWeight: 500 }}
              >
                Log in to manage your logistics
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label
                  className="block text-sm font-bold mb-3"
                  style={{ color: "#191b23", fontFamily: "Quicksand" }}
                >
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-6 py-3 border-2 transition-all duration-300"
                  style={{
                    borderColor:
                      focusedField === "email" ? "#004ac6" : "#e1e2ed",
                    borderRadius: "16px",
                    backgroundColor: focusedField === "email" ? "#f3f3fe" : "#faf8ff",
                    color: "#191b23",
                    fontFamily: "Quicksand",
                    fontSize: "16px",
                  }}
                  placeholder="you@example.com"
                  required
                />
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-3">
                  <label
                    className="block text-sm font-bold"
                    style={{ color: "#191b23", fontFamily: "Quicksand" }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-bold transition-colors"
                    style={{ color: "#004ac6", fontFamily: "Quicksand" }}
                  >
                    Forgot?
                  </a>
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-6 py-3 border-2 transition-all duration-300"
                  style={{
                    borderColor:
                      focusedField === "password" ? "#004ac6" : "#e1e2ed",
                    borderRadius: "16px",
                    backgroundColor:
                      focusedField === "password" ? "#f3f3fe" : "#faf8ff",
                    color: "#191b23",
                    fontFamily: "Quicksand",
                    fontSize: "16px",
                  }}
                  placeholder="••••••••"
                  required
                />
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl"
                  style={{ backgroundColor: "#ffebee" }}
                >
                  <p className="text-sm font-bold" style={{ color: "#ba1a1a", fontFamily: "Quicksand" }}>
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Sign In Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 font-bold text-white rounded-2xl transition-all duration-300 mt-8"
                style={{
                  backgroundColor: loading ? "#1d4ed8" : "#004ac6",
                  fontFamily: "Quicksand",
                  fontSize: "16px",
                  boxShadow:
                    "0 8px 16px rgba(0, 84, 219, 0.24), inset 0 -2px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Login Dashboard"
                )}
              </motion.button>

              {/* Demo Credentials */}
              <motion.div variants={itemVariants} className="mt-8 pt-6 border-t-2" style={{ borderColor: "#e1e2ed" }}>
                <p
                  className="text-xs text-center mb-4"
                  style={{ color: "#434655", fontFamily: "Quicksand", fontWeight: 600 }}
                >
                  Demo Credentials
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { role: "Business", email: "owner@logitrack.com" },
                    { role: "Agent", email: "agent@logitrack.com" },
                    { role: "Customer", email: "customer@logitrack.com" },
                  ].map((cred, idx) => (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setEmail(cred.email);
                        setPassword("password123");
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-xl text-xs font-bold transition-all text-center"
                      style={{
                        backgroundColor: "#ededf9",
                        color: "#004ac6",
                        fontFamily: "Quicksand",
                      }}
                    >
                      {cred.role}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}