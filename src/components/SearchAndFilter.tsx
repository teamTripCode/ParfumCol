"use client";

import { LotionDto } from "@/types/Lotion";
import React, { useState, useEffect, useCallback, useRef } from "react";
import LotionCard from "./LotionCard";
import FilterBar from "./FilterBar";
import { TbLoader } from "react-icons/tb";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const SearchAndFilterBar = () => {
    const [sortOpen, setSortOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [lotions, setLotions] = useState<LotionDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const fetchLotions = useCallback(async () => {
        setLoading(true);
        const isSearching = searchQuery.trim() !== "";

        const url = isSearching
            ? `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/search_lotion`
            : `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/all_lotions?page=${page}`;

        // Mapeamos los filtros seleccionados para pasarlos como parámetros
        const genreMap: Record<string, string> = {
            "Masculino": "Masculino",
            "Femenino": "Femenino",
            "Unisex": "Unisex",
        };

        const selectedGenre = selectedFilters.find(filter => genreMap[filter]);
        const onlyAvailable = selectedFilters.includes("Solo disponibles");

        try {
            const response = await fetch(url, {
                method: isSearching ? "POST" : "GET",
                headers: { "Content-Type": "application/json" },
                body: isSearching
                    ? JSON.stringify({
                        name: searchQuery,
                        page,
                        priceOrder: "asc",
                        genre: selectedGenre || undefined, // Solo se envía si hay género seleccionado
                        onlyAvailable, // Esto depende de cómo manejes disponibilidad en el backend
                    })
                    : undefined,
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            setLotions(data.success ? data.data : []);
            setTotalPages(data.pagination?.totalPages || 1);
        } catch (error) {
            console.error("Error fetching lotions:", error);
            setLotions([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, page, selectedFilters]);


    // Guardar scroll position con throttling
    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            scrollTimeout.current = setTimeout(() => {
                const currentState = {
                    page,
                    scrollPosition: window.scrollY,
                    searchQuery,
                };
                localStorage.setItem('catalogState', JSON.stringify(currentState));
            }, 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [page, searchQuery]);

    // Guardar estado cuando cambian los valores
    useEffect(() => {
        const currentState = {
            page,
            scrollPosition: window.scrollY,
            searchQuery,
        };
        localStorage.setItem('catalogState', JSON.stringify(currentState));
    }, [page, searchQuery]);

    // Recuperar estado desde localStorage
    useEffect(() => {
        const savedState = localStorage.getItem("catalogState");
        if (savedState) {
            const {
                page: savedPage,
                scrollPosition: savedScroll,
                searchQuery: savedQuery,
            } = JSON.parse(savedState);

            setPage(savedPage || 1);
            setSearchQuery(savedQuery || "");

            const restoreScroll = () => {
                window.scrollTo(0, savedScroll || 0);
            };

            if (document.readyState === 'complete') {
                restoreScroll();
            } else {
                window.addEventListener('load', restoreScroll);
                return () => window.removeEventListener('load', restoreScroll);
            }
        }
    }, []);

    useEffect(() => {
        fetchLotions();
    }, [fetchLotions]);

    const updateVisiblePages = () => {
        const startPage = Math.max(1, page - 1);
        const endPage = Math.min(totalPages, startPage + 2);
        const newVisiblePages = [];

        for (let i = startPage; i <= endPage; i++) {
            newVisiblePages.push(i);
        }

        setVisiblePages(newVisiblePages);
    };

    useEffect(() => {
        updateVisiblePages();
    }, [page, totalPages]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="w-[90%] ml-[5%] border-b p-3 border-gray-200 pt-10">
            <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortOpen={sortOpen}
                setSortOpen={setSortOpen}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                fetchLotions={fetchLotions}
            />

            <main className="mt-8 min-h-dvh">
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <TbLoader className="animate-rotate text-gray-600" />
                        <p className="font-semibold text-gray-600">Cargando</p>
                    </div>
                ) : (
                    <div className="mx-auto">
                        {lotions.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
                                {lotions.map((lotion) => (
                                    <LotionCard key={lotion.id} lotion={lotion} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No se encontraron lociones.</p>
                        )}
                    </div>
                )}
            </main>

            <div className="flex justify-center items-center gap-3 mt-10 mb-10">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-gray-300 
                    hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                    <MdNavigateBefore className="w-4 h-4" />
                    <span className="text-sm">Anterior</span>
                </button>

                <div className="flex items-center space-x-1">
                    {visiblePages.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors 
                                duration-300 ${page === pageNumber
                                    ? 'bg-purple-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
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

export default SearchAndFilterBar;