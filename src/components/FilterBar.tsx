import React, { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const FilterBar = ({
    searchQuery,
    setSearchQuery,
    sortOpen,
    setSortOpen,
    selectedFilters,
    setSelectedFilters,
    fetchLotions,
}: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    sortOpen: boolean;
    setSortOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedFilters: string[];
    setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
    fetchLotions: (query?: string, order?: "asc" | "desc", filters?: string[]) => void;
}) => {
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleFilterClick = (filter: string) => {
        setSelectedFilters((prevFilters) => {
            const isActive = prevFilters.includes(filter);
            const newFilters = isActive
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter];

            fetchLotions(searchQuery, sortOrder, newFilters);
            return newFilters;
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        query.trim() === "" ? fetchLotions() : fetchLotions(query, sortOrder, selectedFilters);
    };

    const handleSortSelection = (order: "asc" | "desc") => {
        setSortOrder(order);
        setSortOpen(false);
        fetchLotions(searchQuery, order, selectedFilters);
    };

    return (
        <div className="w-full mt-6">
            <div className="flex flex-wrap justify-between md:gap-6 gap-5">
                {/* Barra de búsqueda */}
                <div className="flex basis-[400px] grow">
                    <div className="flex text-base w-full rounded-md">
                        <div className="pt-2">
                            <FaSearch className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar lociones..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full h-8 ml-2 outline-none text-base text-gray-600 placeholder-gray-400 bg-white px-3 py-2 rounded-md"
                        />
                    </div>
                </div>

                {/* Contenedor de filtros y orden */}
                <div className="w-full basis-[400px] flex flex-col gap-2">
                    {/* Ordenar */}
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="flex justify-start text-sm text-gray-600 grow px-4 py-2  h-auto hover:text-gray-900 bg-gray-100 w-full rounded-md"
                    >
                        <div className="flex flex-row gap-2 justify-between w-full">
                            <span className="gr">Ordenar por</span>
                            <div className="grid place-content-center">
                                <FaChevronDown />
                            </div>
                        </div>
                    </button>

                    {/* Dropdown de opciones de ordenar */}
                    {sortOpen && (
                        <div className="w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-2">
                            <button
                                onClick={() => handleSortSelection("asc")}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortOrder === "asc" ? "font-bold text-blue-500" : "text-gray-700"}`}
                            >
                                Precio - Menor a Mayor
                            </button>
                            <button
                                onClick={() => handleSortSelection("desc")}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortOrder === "desc" ? "font-bold text-blue-500" : "text-gray-700"}`}
                            >
                                Precio - Mayor a Menor
                            </button>
                        </div>
                    )}

                    <div className={`flex flex-wrap gap-2 mt-4 md:mt-0 w-full`}>
                        {["Masculino", "Femenino", "Unisex"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => handleFilterClick(filter)}
                                className={`text-sm px-3 py-1 rounded-md border border-gray-300 shadow-md ${selectedFilters.includes(filter) ? "bg-blue-500 text-white" : "text-gray-600 hover:text-gray-900"}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
