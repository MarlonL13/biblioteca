import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #818cf855" }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="bg-gradient-to-br from-white via-slate-50 to-slate-200 border border-slate-200 shadow-lg rounded-xl p-6 flex flex-col gap-2 w-80"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{book.title}</h2>
      <p><span className="font-semibold text-slate-600">Autor:</span> <span className="text-slate-700">{book.autor}</span></p>
      <p><span className="font-semibold text-slate-600">Editora:</span> <span className="text-slate-700">{book.editora}</span></p>
      <p><span className="font-semibold text-slate-600">Idioma:</span> <span className="text-slate-700">{book.idioma}</span></p>
      <p><span className="font-semibold text-slate-600">Páginas:</span> <span className="text-slate-700">{book.paginas}</span></p>
      <div className="flex gap-3 mt-5">
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition"
          onClick={() => onEdit(book)}
        >
          <FiEdit2 />
          Editar
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-rose-600 hover:to-rose-700 transition"
          onClick={() => onDelete(book.id)}
        >
          <FiTrash2 />
          Remover
        </button>
      </div>
    </motion.div>
  );
}