import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Trabalhando com autenticacao</h1>
        <div className="mt-3.5" >
        <button className="bg-blue-700 rounded-2xl text-white p-3 hover:bg-amber-600 cursor-pointer" onClick={() => signIn("github",{callbackUrl: "/dashboard"})}>
            Entrar com GitHub
          </button>
        </div>
      </main>
      
    </div>
  );
}
