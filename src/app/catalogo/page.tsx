"use client"

import HousesLotionsCarrousel from "@/components/HousesLotionsCarrousel"
import NavBar from "@/components/NavBar"
import SearchAndFilterBar from "@/components/SearchAndFilter"

function CatalogComponent() {
    return (
        <>
            <NavBar />
            <HousesLotionsCarrousel />
            <SearchAndFilterBar />
        </>
    )
}

export default CatalogComponent