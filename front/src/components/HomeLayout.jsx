"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";

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
    alert("Salvar alterações (placeholder)");
    setEditBook(null);
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditBook(null);
    setNewBook({ title: "", autor: "", editora: "", idioma: "", paginas: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-pink-100 flex flex-col items-center py-12">
      <main className="flex flex-col gap-10 w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-4 drop-shadow">📚 Biblioteca</h1>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 mb-6"
          onClick={() => {
            setShowModal(true);
            setEditBook(null);
          }}
        >
          Adicionar Novo Livro
        </button>
        <AddBookModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSubmit={editBook ? handleSaveChanges : handleAddBook}
          newBook={editBook ? editBook : newBook}
          setNewBook={editBook ? setEditBook : setNewBook}
          isEdit={!!editBook}
        />
        <div className="flex flex-wrap justify-center gap-8">
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}