import React from "react";

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-slate-200 border border-slate-200 shadow-lg rounded-xl p-6 flex flex-col gap-2 w-80 transition-transform hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{book.title}</h2>
      <p><span className="font-semibold text-slate-600">Autor:</span> <span className="text-slate-700">{book.autor}</span></p>
      <p><span className="font-semibold text-slate-600">Editora:</span> <span className="text-slate-700">{book.editora}</span></p>
      <p><span className="font-semibold text-slate-600">Idioma:</span> <span className="text-slate-700">{book.idioma}</span></p>
      <p><span className="font-semibold text-slate-600">Páginas:</span> <span className="text-slate-700">{book.paginas}</span></p>
      <div className="flex gap-3 mt-5">
        <button
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition"
          onClick={() => onEdit(book)}
        >
          Editar
        </button>
        <button
          className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-rose-600 hover:to-rose-700 transition"
          onClick={() => onDelete(book.id)}
        >
          Remover
        </button>
      </div>
    </div>
  );
}