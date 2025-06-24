'use client'

import {signOut} from "next-auth/react"

export default function LogoutButton(){
    return(
        <button className="bg-red-500 p-2 m-5 hover:bg-red-300 text-white rounded-2xl" onClick={() => signOut({callbackUrl: "/"})} >Sair</button>
    )

}