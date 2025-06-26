"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { FiLogOut, FiPlus, FiSearch, FiBookOpen, FiFileText, FiUsers, FiGlobe, FiBarChart2 } from "react-icons/fi";

export default function HomeClient() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    autor: "",
    editora: "",
    idioma: "",
    paginas: ""
  });
  const [editBook, setEditBook] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/tasks")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = (book) => {
    setEditBook(book);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() => setBooks(books.filter(book => book.id !== id)))
      .catch(err => console.error(err));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.title.trim() || !newBook.autor.trim()) return;
    try {
      const res = await axios.post("http://localhost:3000/tasks", newBook);
      setBooks([...books, res.data]);
      setNewBook({ title: "", autor: "", editora: "", idioma: "", paginas: "" });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!editBook.title.trim() || !editBook.autor.trim()) return;
    try {
      const res = await axios.put(`http://localhost:3000/tasks/${editBook.id}`, editBook);
      setBooks(books.map(book => book.id === editBook.id ? res.data : book));
      setEditBook(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditBook(null);
    setNewBook({ title: "", autor: "", editora: "", idioma: "", paginas: "" });
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalBooks = books.length;
  const totalPages = books.reduce((sum, b) => sum + (parseInt(b.paginas) || 0), 0);
  const uniqueAuthors = new Set(books.map(b => b.autor)).size;
  const mostCommonLanguage = (() => {
    if (!books.length) return "-";
    const freq = {};
    books.forEach(b => {
      if (b.idioma) freq[b.idioma] = (freq[b.idioma] || 0) + 1;
    });
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-200 to-pink-200 flex flex-col items-center">
      {/* Animated Header */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }}
        className="w-full bg-white/90 shadow-lg mb-12"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight select-none">
            Biblioteca
          </h1>
          <button
            className="cursor-pointer flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-200 transition"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <FiLogOut className="text-lg" />
            Sair
          </button>
        </div>
      </motion.header>

      <main className="flex flex-col gap-10 w-full max-w-6xl pb-16">
        {/* Add + Search Combo */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-2 w-full">
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: "0 4px 24px #60a5fa33",
            }}
            whileTap={{
              scale: 0.97,
              boxShadow: "0 2px 16px #818cf833",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition w-full sm:w-auto flex items-center gap-2"
            onClick={() => {
              setShowModal(true);
              setEditBook(null);
            }}
          >
            <FiPlus className="text-lg" />
            Adicionar Livro
          </motion.button>
          <div className="relative flex-1 w-full sm:w-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar livro por título..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-11 pr-4 py-3 border border-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80 text-slate-800 text-lg placeholder-slate-500 transition w-full"
            />
          </div>
        </div>

        {/* Analytics Bar (no motion, but visually rich) */}
        <section className="w-full max-w-6xl mb-6 px-6">
          <div className="flex flex-wrap gap-6 justify-between items-center bg-white/80 rounded-lg shadow p-4 text-slate-700 text-base font-medium border border-blue-100">
            <span className="flex items-center gap-2">
              <FiBookOpen className="text-blue-500" />
              <b>Total de livros:</b> {totalBooks}
            </span>
            <span className="hidden sm:block text-slate-300">|</span>
            <span className="flex items-center gap-2">
              <FiUsers className="text-indigo-400" />
              <b>Autores únicos:</b> {uniqueAuthors}
            </span>
            <span className="hidden sm:block text-slate-300">|</span>
            <span className="flex items-center gap-2">
              <FiGlobe className="text-yellow-500" />
              <b>Idioma mais comum:</b> {mostCommonLanguage}
            </span>
            <span className="hidden sm:block text-slate-300">|</span>
            <span className="flex items-center gap-2">
              <FiBarChart2 className="text-green-500" />
              <b>Média de páginas:</b> {totalBooks > 0 ? Math.round(totalPages / totalBooks) : 0}
            </span>
          </div>
        </section>

        <AddBookModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSubmit={editBook ? handleSaveChanges : handleAddBook}
          newBook={editBook ? editBook : newBook}
          setNewBook={editBook ? setEditBook : setNewBook}
          isEdit={!!editBook}
        />
        <div className="flex flex-wrap justify-center gap-8">
          <AnimatePresence>
            {filteredBooks.map((book, idx) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                whileHover={{
                  scale: 1.03,
                  rotateY: 4,
                  boxShadow: "0 0 24px 4px #60a5fa55",
                }}
                whileTap={{
                  scale: 0.98,
                  rotateY: -4,
                  boxShadow: "0 0 32px 8px #818cf855",
                }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.07,
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                }}
              >
                <BookCard
                  book={book}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}