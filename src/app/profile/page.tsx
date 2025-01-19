"use client"

import { useAuth } from "@/context/authContext"

function Profile() {
    const { user } = useAuth()
    return (
        <>
            <h1>Hola</h1>
            { user ? <h1> { user?.name } </h1> : "Usuario Sin Cuenta" }

        </>
    )
}

export default Profile