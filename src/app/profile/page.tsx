"use client"

import NavBar from "@/components/NavBar"
import { useAuth } from "@/context/authContext"

function Profile() {
    const { user } = useAuth()
    return (
        <>
            <NavBar />
            <div className="mt-28">
                <h1>Hola</h1>
                {user ? <h1> {user?.name} </h1> : "Usuario Sin Cuenta"}
            </div>
        </>
    )
}

export default Profile