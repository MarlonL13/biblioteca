'use client'
import {signIn} from "next-auth/react"

export default function Login() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-200 to-pink-200 flex justify-center items-center py-12">
      
      <div className="bg-gray-50 w-[300px] h-[350px] rounded-sm p-3 flex flex-col justify-around items-center shadow-2xl">
        <h1 className="text-4xl  border-b-3 pb-1 border-blue-500 w-full text-center text-gray-900 ">Biblioteca</h1>
        <p className="p-3 text-center text-gray-900" >Bem-vindo ao seu sistema de gerenciamento!</p>
        <div className="w-full" >
        <button className="bg-blue-400 w-full rounded-sm  p-3 hover:bg-blue-500 cursor-pointer" onClick={() => signIn("github",{callbackUrl: "/home"})}>
            Entrar com GitHub
          </button>
        </div>
      </div>
      
    </div>
  );
}
