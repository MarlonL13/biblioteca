import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddBookModal({
  isOpen,
  onClose,
  onSubmit,
  newBook,
  setNewBook,
  isEdit,
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
            initial={{ scale: 0.7, opacity: 0, y: 80 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 80 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={onClose}
              aria-label="Fechar"
            >
              &times;
            </button>
            <h2
              className={`text-2xl font-extrabold mb-6 flex items-center gap-2 text-gray-900`}
            >
              {isEdit ? (
                <>
                  <span role="img" aria-label="Editar">
                    ✏️
                  </span>
                  Editar Livro
                </>
              ) : (
                <>
                  <span role="img" aria-label="Adicionar">
                    📚
                  </span>
                  Adicionar Novo Livro
                </>
              )}
            </h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-1"
                  htmlFor="title"
                >
                  Título do livro
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Ex: Dom Quixote"
                  value={newBook.title}
                  onChange={handleChange}
                  className="p-3 rounded-xl border border-gray-300 focus:border-blue-400 focus:outline-none transition w-full placeholder-gray-500 text-gray-900"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-1"
                  htmlFor="autor"
                >
                  Autor
                </label>
                <input
                  id="autor"
                  name="autor"
                  type="text"
                  placeholder="Ex: Miguel de Cervantes"
                  value={newBook.autor}
                  onChange={handleChange}
                  className="p-3 rounded-xl border border-gray-300 focus:border-blue-400 focus:outline-none transition w-full placeholder-gray-500 text-gray-900"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-1"
                  htmlFor="editora"
                >
                  Editora
                </label>
                <input
                  id="editora"
                  name="editora"
                  type="text"
                  placeholder="Ex: Companhia das Letras"
                  value={newBook.editora}
                  onChange={handleChange}
                  className="p-3 rounded-xl border border-gray-300 focus:border-blue-400 focus:outline-none transition w-full placeholder-gray-500 text-gray-900"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-1"
                  htmlFor="idioma"
                >
                  Idioma
                </label>
                <input
                  id="idioma"
                  name="idioma"
                  type="text"
                  placeholder="Ex: Português"
                  value={newBook.idioma}
                  onChange={handleChange}
                  className="p-3 rounded-xl border border-gray-300 focus:border-blue-400 focus:outline-none transition w-full placeholder-gray-500 text-gray-900"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-1"
                  htmlFor="paginas"
                >
                  Páginas
                </label>
                <input
                  id="paginas"
                  name="paginas"
                  type="number"
                  placeholder="Ex: 300"
                  value={newBook.paginas}
                  onChange={handleChange}
                  className="p-3 rounded-xl border border-gray-300 focus:border-blue-400 focus:outline-none transition w-full placeholder-gray-500 text-gray-900"
                  min={1}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                Salvar
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}