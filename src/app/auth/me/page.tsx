"use client"

import { useAuth } from "@/context/authContext"

function MePage() {
    const { user } = useAuth()
    return (
        <>
            <h1>Hola</h1>
            <p>{user?.name}</p>
        </>
    )
}

export default MePage