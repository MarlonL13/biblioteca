import React from 'react'
import Link from 'next/link'
import Logout from "../components/Logout"

const Header = () => {
  return (
    <div>
      <header>
        <nav className='flex justify-between items-center bg-gray-50 text-white p-6 border-b-4 border-blue-300'>
            <div>
                <h1 className="text-4xl text-slate-800 text-center drop-shadow">Biblioteca</h1>
            </div>
            <Logout/>
        </nav>
      </header>
    </div>
  )
}

export default Header