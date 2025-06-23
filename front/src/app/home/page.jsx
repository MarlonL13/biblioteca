"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Home() {
  
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return(
      <div className="text-red-700" >VOCÊ NÃO ESTÁ LOGADO</div>
    )
  }

  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/tasks")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = (book) => {
    // TODO: Show edit form/modal
    alert(`Edit book: ${book.title}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() => setBooks(books.filter(book => book.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-pink-100 flex flex-col items-center py-12">
      <main className="flex flex-col gap-10 w-full max-w-6xl">
        <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-4 drop-shadow">📚 Biblioteca</h1>
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