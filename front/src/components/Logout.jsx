'use client'
import { ImExit } from "react-icons/im";
import {signOut} from "next-auth/react"

export default function LogoutButton(){
    return(
        <button className=" text-gray-900 text-2xl cursor-pointer" onClick={() => signOut({callbackUrl: "/"})} ><ImExit /></button>
    )
    // 
}