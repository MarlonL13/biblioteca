import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import HomeClient from "../../components/HomeLayout";
import {signOut} from "next-auth/react"
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-300 via-orange-200 to-yellow-200 flex justify-center items-center py-12">
            <div className="bg-gray-50 w-[300px] h-[350px] rounded-sm p-3 flex flex-col justify-around items-center shadow-2xl">
              <h1 className="text-4xl  border-b-3 pb-1 border-red-500 w-full text-center text-gray-900 ">Biblioteca</h1>
              <p className="p-3 text-center text-gray-900 text-2xl">Acesso negado!</p>
              <Link href='/' className="w-full">
                <button className="bg-red-500 w-full p-3 hover:bg-red-300 text-white rounded-sm">Página inicial</button>    
              </Link>
            </div>
            
          </div>
    );
  }
  return(
    <div>
      <div>
        <HomeClient />
      </div>
    </div>
  )
}