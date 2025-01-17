"use client"

import { useRouter } from "next/navigation"

function HeroSection() {
    const router = useRouter()
    return (
        <div className="pt-44 px-[5%] mb-5">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                    Descubre la Esencia del Lujo a tu Alcance
                </h1>
                <p className="text-lg text-gray-600 mb-8 text-center">
                    Fragancias inspiradas en las casas de perfume más prestigiosas del mundo, con la misma calidad, duración y elegancia, pero a un precio accesible.
                </p>
            </div>

            <div className="grid place-content-center">
                <button
                    type="button"
                    className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2"
                    onClick={() => router.push('/catalogo')}
                >
                    Ver Catalogo
                </button>
            </div>
        </div>
    )
}

export default HeroSection