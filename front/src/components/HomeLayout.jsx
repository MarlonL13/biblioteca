"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";
import Header from "./Header";
import { IoSearch } from "react-icons/io5";
import { LuBookPlus } from "react-icons/lu";



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
    alert("Salvar alterações (placeholder)");
    setEditBook(null);
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditBook(null);
    setNewBook({ title: "", autor: "", editora: "", idioma: "", paginas: "" });
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );
  return (<>
      <Header/>
   <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-pink-100 flex flex-col items-center py-12">
      <main className="flex flex-col gap-10 w-full max-w-6xl">
        <div className="flex w-full gap-3" >
               {/* Search Bar */}
          <div className="flex justify-center items-center gap-2 mb-6 w-full flex-3 ">
            <IoSearch className="text-4xl text-blue-700" />
            <input
              type="text"
              placeholder="Buscar livro por título..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-5 py-3  border border-blue-400 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-slate-800 text-lg placeholder-slate-500 transition"
            />
          </div>
        <button
          className="bg-blue-700 flex items-center gap-2 text-white px-4 py-2 w-fit rounded hover:bg-blue-800 mb-6"
          onClick={() => {
            setShowModal(true);
            setEditBook(null);
          }}
        >
          <LuBookPlus className="" />Adicionar
        </button>
        </div>
        
        <AddBookModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSubmit={editBook ? handleSaveChanges : handleAddBook}
          newBook={editBook ? editBook : newBook}
          setNewBook={editBook ? setEditBook : setNewBook}
          isEdit={!!editBook}
        />
        <div className="flex flex-wrap justify-center gap-8">
          {filteredBooks.map(book => (
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
  </>
   
  );
}