"use client";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiLogIn } from "react-icons/fi";

export default function NotAllowed() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-300 via-orange-200 to-yellow-200">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="bg-white/80 rounded-2xl shadow-2xl p-10 flex flex-col items-center"
        style={{
          boxShadow: "0 8px 40px 0 #fbbf24aa, 0 1.5px 8px 0 #f87171aa",
        }}
      >
        <FiAlertTriangle className="text-6xl text-orange-400 mb-4" />
        <h1 className="text-2xl font-bold text-orange-700 mb-2">
          Acesso Negado
        </h1>
        <p className="mb-6 text-orange-600 text-center">
          Você precisa estar logado para acessar a biblioteca.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="cursor-pointer flex items-center gap-2 bg-red-400 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition"
          onClick={() => signIn("github", { callbackUrl: "/home" })}
        >
          <FiLogIn className="text-lg" />
          Entrar com GitHub
        </motion.button>
      </motion.div>
    </div>
  );
}