'use client'
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-200 to-pink-200 flex justify-center items-center py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="bg-white/90 w-[340px] rounded-2xl p-8 flex flex-col justify-between items-center shadow-2xl"
        style={{
          boxShadow: "0 8px 40px 0 #818cf8aa, 0 1.5px 8px 0 #60a5faaa"
        }}
      >
        <h1 className="text-4xl text-blue-700 mb-2 text-center drop-shadow">
        Biblioteca
        </h1>
        <p className="p-3 text-center text-slate-700 mb-4">
          Bem-vindo ao seu sistema de gerenciamento!
        </p>
        <button
          className="bg-gradient-to-r from-blue-500 to-pink-400 w-full rounded-xl p-3 text-white font-bold text-lg shadow hover:from-blue-600 hover:to-pink-500 transition"
          onClick={() => signIn("github", { callbackUrl: "/home" })}
        >
          Entrar com GitHub
        </button>
      </motion.div>
    </div>
  );
}
