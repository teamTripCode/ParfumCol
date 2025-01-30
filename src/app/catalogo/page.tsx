"use client"

import HousesLotionsCarrousel from "@/components/HousesLotionsCarrousel"
import NavBar from "@/components/NavBar"
import SearchAndFilterBar from "@/components/SearchAndFilter"

function CatalogComponent() {
    return (
        <>
            <NavBar />
            <div className="w-[90%] ml-[5%] mt-28 h-96 bg-black relative rounded-lg overflow-hidden">
                <h1 className="text-white text-4xl p-8">Explora nuestra colección exclusiva de perfumes de lujo</h1>
                <button
                    className="absolute bottom-4 right-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => console.log('Más información')}
                >
                    Más información
                </button>
            </div>
            <HousesLotionsCarrousel />
            <SearchAndFilterBar />
        </>
    )
}

export default CatalogComponent