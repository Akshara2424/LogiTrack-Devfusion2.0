"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div style={{ backgroundColor: "#faf8ff" }}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full"
          style={{ backgroundColor: "#004ac6" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full"
          style={{ backgroundColor: "#fd761a" }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-md border-b-2"
        style={{ borderColor: "#e1e2ed", backgroundColor: "rgba(250, 248, 255, 0.95)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#004ac6" }}
            >
              LT
            </div>
            <span
              className="text-2xl font-bold"
              style={{ color: "#004ac6", fontFamily: "Quicksand" }}
            >
              LogiTrack
            </span>
          </motion.div>

          {/* Menu */}
          <div className="flex items-center gap-8">
            {["Track Shipment", "Services", "Pricing"].map((item) => (
              <motion.a
                key={item}
                whileHover={{ color: "#004ac6" }}
                href="#"
                className="font-medium transition-colors"
                style={{ color: "#434655", fontFamily: "Quicksand" }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/login'}
              className="px-6 py-2 rounded-full text-white font-bold"
              style={{ backgroundColor: "#004ac6", fontFamily: "Quicksand" }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-bold"
              style={{
                backgroundColor: "#ffebee",
                color: "#fd761a",
                fontFamily: "Quicksand",
              }}
            >
              ⚡ New: Instant Fleet Management
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div variants={itemVariants}>
              <h1
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{ color: "#191b23", fontFamily: "Quicksand" }}
              >
                Logistics{" "}
                <span style={{ color: "#fd761a" }}>made fun.</span>
              </h1>
              <p
                className="text-lg mb-8"
                style={{ color: "#434655", fontFamily: "Quicksand", fontWeight: 500 }}
              >
                Experience shipping that's as fast as a click and as reliable as a handshake. We bring speed and power to every package delivered.
              </p>

              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/login'}
                  className="px-8 py-3 rounded-full text-white font-bold"
                  style={{ backgroundColor: "#004ac6", fontFamily: "Quicksand" }}
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full font-bold border-2 transition-all"
                  style={{
                    borderColor: "#004ac6",
                    color: "#004ac6",
                    fontFamily: "Quicksand",
                  }}
                >
                  See How It Works
                </motion.button>
              </div>

              <motion.p
                className="text-sm"
                style={{ color: "#434655", fontFamily: "Quicksand" }}
              >
                ✓ Trusted by 2,000+ businesses
              </motion.p>
            </motion.div>

            {/* Right: Truck Image */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <div
                className="rounded-3xl overflow-hidden shadow-lg relative"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 84, 219, 0.15)",
                }}
              >
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-96 flex items-center justify-center relative overflow-hidden">
                  {/* Truck illustration placeholder */}
                  <div className="text-center">
                    <div className="text-8xl mb-4">🚚</div>
                    <div className="bg-white bg-opacity-90 rounded-2xl px-6 py-4 inline-block">
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#004ac6", fontFamily: "Quicksand" }}
                      >
                        IN TRANSIT
                      </p>
                      <p
                        className="text-3xl font-bold"
                        style={{ color: "#191b23", fontFamily: "Quicksand" }}
                      >
                        99.9%
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "#434655", fontFamily: "Quicksand" }}
                      >
                        On-time delivery
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 border-t-2" style={{ borderColor: "#e1e2ed" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#004ac6", fontFamily: "Quicksand" }}
            >
              Smart. Simple. Fast.
            </h2>
            <p
              className="text-lg"
              style={{ color: "#434655", fontFamily: "Quicksand", fontWeight: 500 }}
            >
              Our features are designed to take the stress out of logistics so you can focus on growing your empire.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: "⚡",
                title: "Fastest Delivery",
                desc: "Our algorithm finds the most efficient routes in real-time, cutting down delivery times by up to 35% compared to industry standards.",
                highlight: true,
              },
              {
                icon: "📍",
                title: "Live Tracking",
                desc: "Follow every move. Real-time updates with GPS accuracy so you have the power to wonder where your cargo is.",
                highlight: false,
              },
              {
                icon: "🤖",
                title: "Fleet Management",
                desc: "Scale your operations effortlessly. Manage hundreds of vehicles from a single, intuitive dashboard.",
                highlight: false,
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="rounded-3xl p-8 bg-white border-l-4"
                style={{
                  borderColor: feature.highlight ? "#fd761a" : "#004ac6",
                  boxShadow: "0 4px 12px rgba(0, 84, 219, 0.08)",
                }}
              >
                <p className="text-5xl mb-4">{feature.icon}</p>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#191b23", fontFamily: "Quicksand" }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{ color: "#434655", fontFamily: "Quicksand", fontWeight: 500 }}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 rounded-3xl p-12 text-white"
          style={{ backgroundColor: "#004ac6" }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: "Quicksand" }}
              >
                Start Tracking Today
              </h3>
              <p
                className="text-lg mb-6"
                style={{ fontFamily: "Quicksand", fontWeight: 500 }}
              >
                Join the revolution of fun, fast, and friendly logistics. Your first 5 local deliveries are on us!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/login'}
                className="px-8 py-3 rounded-full bg-white text-blue-600 font-bold"
                style={{ fontFamily: "Quicksand" }}
              >
                Claim Free Deliveries
              </motion.button>
            </div>
            <p className="text-6xl text-center">📦</p>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Section */}
      <section className="relative z-10 py-20 border-t-2" style={{ borderColor: "#e1e2ed" }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl font-bold text-center mb-16"
            style={{ color: "#191b23", fontFamily: "Quicksand" }}
          >
            Why choose <span style={{ color: "#fd761a" }}>LogiTrack?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Character */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-9xl mb-4">👨‍💼</p>
              <p
                className="text-sm"
                style={{ color: "#434655", fontFamily: "Quicksand" }}
              >
                Meet our friendly logistics expert
              </p>
            </motion.div>

            {/* Right: Features */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: "🤝",
                  title: "Friendly Partnership",
                  desc: "We treat your business like it's our own. Our support team is human, helpful, and always happy to chat.",
                },
                {
                  icon: "🔮",
                  title: "Proactive Solutions",
                  desc: "We don't react to problems; we predict them. Our AI identifies delays before they happen.",
                },
                {
                  icon: "🌱",
                  title: "Premium Fleet",
                  desc: "Eco-friendly vehicles and state-of-the-art warehouses ensure your cargo stays in perfect condition.",
                },
              ].map((item, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <div className="flex gap-4">
                    <p className="text-4xl">{item.icon}</p>
                    <div>
                      <h3
                        className="font-bold text-lg mb-2"
                        style={{ color: "#191b23", fontFamily: "Quicksand" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{ color: "#434655", fontFamily: "Quicksand", fontWeight: 500 }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="relative z-10 py-20"
        style={{ backgroundColor: "#004ac6" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "15M+", label: "Packages Delivered" },
              { value: "450+", label: "Fleet Vehicles" },
              { value: "98%", label: "Happy Clients" },
              { value: "24/7", label: "Active Monitoring" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <p
                  className="text-5xl font-bold mb-2"
                  style={{ fontFamily: "Quicksand" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-lg"
                  style={{ fontFamily: "Quicksand", fontWeight: 500 }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 border-t-2 py-12"
        style={{ borderColor: "#e1e2ed" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "#004ac6" }}
                >
                  LT
                </div>
                <span
                  className="font-bold"
                  style={{ color: "#004ac6", fontFamily: "Quicksand" }}
                >
                  LogiTrack
                </span>
              </div>
              <p
                className="text-sm"
                style={{ color: "#434655", fontFamily: "Quicksand" }}
              >
                Making the complicated simple, one delivery at a time.
              </p>
            </div>

            {[
              { title: "Product", links: ["Track API", "Fleet Ops", "Pricing"] },
              { title: "Support", links: ["Support Center", "Help Center", "Contact Us"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
            ].map((col, idx) => (
              <div key={idx}>
                <p
                  className="font-bold mb-4"
                  style={{ color: "#191b23", fontFamily: "Quicksand" }}
                >
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors hover:text-blue-600"
                        style={{ color: "#434655", fontFamily: "Quicksand" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="border-t pt-8"
            style={{ borderColor: "#e1e2ed" }}
          >
            <p
              className="text-sm text-center"
              style={{ color: "#434655", fontFamily: "Quicksand" }}
            >
              © 2024 LogiTrack Logistics. Making the world, one package at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}