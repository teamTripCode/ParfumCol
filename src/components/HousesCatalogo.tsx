"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import { GiSharpCrown } from "react-icons/gi";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface House {
    id: number;
    name: string;
    logo: string | null;
}

const PerfumeHousesGrid: React.FC = () => {
    const [houses, setHouses] = useState<House[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
    const router = useRouter();

    useEffect(() => {
        const fetchHouses = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/all_houses`,
                    {
                        params: { page: currentPage },
                    }
                );
                setHouses(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            } catch (error) {
                console.error("Error fetching perfume houses:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHouses();
    }, [currentPage]);

    // Función para actualizar las páginas visibles en móviles
    const updateVisiblePages = () => {
        const startPage = Math.max(1, currentPage - 1); // No permitir que sea menor que 1
        const endPage = Math.min(totalPages, startPage + 2); // Mostrar solo 3 páginas a la vez
        const newVisiblePages = [];

        for (let i = startPage; i <= endPage; i++) {
            newVisiblePages.push(i);
        }

        setVisiblePages(newVisiblePages);
    };

    // Actualizar visiblePages cuando cambie la página o totalPages
    useEffect(() => {
        updateVisiblePages();
    }, [currentPage, totalPages]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
            {/* Título con línea decorativa */}
            <div className="relative mb-16">
                <div className="grid place-content-center mb-5">
                    <GiSharpCrown size={50} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"  />
                </div>

                <h2 className="md:text-2xl text-1xl font-light text-gray-600 text-center">
                    Explora las casas de perfumes que más te gustan.
                </h2>
                {/* <div className="absolute w-40 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 -bottom-4 left-1/2 transform -translate-x-1/2" /> */}
            </div>

            {/* Estado de carga */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 rounded-2xl h-64 w-full" />
                        </div>
                    ))}
                </div>
            ) : (
                /* Grid de casas de perfume */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {houses.map((house) => (
                        <div
                            key={house.id}
                            onClick={() => router.push(`casas/${house.name}`)}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
                                     overflow-hidden cursor-pointer animate-fadeIn"
                        >
                            <div className="p-6">
                                <div className="relative h-48 w-full mb-4 flex items-center justify-center 
                                              bg-gray-50 rounded-lg overflow-hidden group">
                                    {house.logo ? (
                                        <img
                                            src={house.logo}
                                            alt={house.name}
                                            className="w-32 h-32 object-contain transform transition-transform 
                                                     duration-300 hover:scale-110"
                                        />
                                    ) : (
                                        <FaImage className="w-16 h-16 text-gray-300 transition-colors 
                                                          duration-300 group-hover:text-gray-400" />
                                    )}
                                </div>
                                {/* <h3 className="text-xl font-light text-gray-700 text-center transition-colors 
                                             duration-300 group-hover:text-gray-900">
                                    {house.name}
                                </h3> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Paginación */}
            <div className="flex justify-center items-center mt-12 space-x-3">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-gray-300 
                 hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 
                 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                    <MdNavigateBefore className="w-4 h-4" />
                    <span className="text-sm">Anterior</span>
                </button>

                <div className="flex items-center space-x-1">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors 
                          duration-300 ${currentPage === i + 1
                                    ? 'bg-purple-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-gray-300 
                 hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 
                 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                    <span className="text-sm">Siguiente</span>
                    <MdNavigateNext className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default PerfumeHousesGrid;
