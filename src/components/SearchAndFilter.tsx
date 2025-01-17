"use client";

import { LotionDto } from "@/types/Lotion";
import React, { useState, useEffect, useCallback, useRef } from "react";
import LotionCard from "./LotionCard";
import FilterBar from "./FilterBar";
import { TbLoader } from "react-icons/tb";

const SearchAndFilterBar = () => {
    const [viewMode, setViewMode] = useState("grid");
    const [sortOpen, setSortOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [lotions, setLotions] = useState<LotionDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchLotions = useCallback(async () => {
        setLoading(true);
        try {
            let url = "";

            if (searchQuery.trim() === "") {
                url = `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/all_lotions?page=${page}`;
            } else {
                url = `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/search_lotion`;
            }

            const response = await fetch(url, {
                method: searchQuery.trim() === "" ? "GET" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:
                    searchQuery.trim() !== ""
                        ? JSON.stringify({
                            name: searchQuery,
                            page,
                            priceOrder: "asc",
                        })
                        : undefined,
            });

            const data = await response.json();

            if (data.success) {
                setLotions(data.data);
                if (data.pagination) {
                    setTotalPages(data.pagination.totalPages);
                } else {
                    setTotalPages(1);
                }
            } else {
                setLotions([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching lotions:", error);
            setLotions([]);
            setTotalPages(1);
        }
        setLoading(false);
    }, [searchQuery, page]);

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
                    viewMode,
                };
                localStorage.setItem('catalogState', JSON.stringify(currentState));
            }, 100); // Throttle de 100ms
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [page, searchQuery, viewMode]);

    // Guardar estado cuando cambian los valores
    useEffect(() => {
        const currentState = {
            page,
            scrollPosition: window.scrollY,
            searchQuery,
            viewMode,
        };
        localStorage.setItem('catalogState', JSON.stringify(currentState));
    }, [page, searchQuery, viewMode]);

    // Recuperar estado desde localStorage
    useEffect(() => {
        const savedState = localStorage.getItem("catalogState");
        if (savedState) {
            const {
                page: savedPage,
                scrollPosition: savedScroll,
                searchQuery: savedQuery,
                viewMode: savedViewMode
            } = JSON.parse(savedState);

            setPage(savedPage || 1);
            setSearchQuery(savedQuery || "");
            setViewMode(savedViewMode || "grid");

            // Restaurar scroll después de que el contenido se haya cargado
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

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
            window.scrollTo(0, 0); // Scroll al inicio al cambiar de página
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
            window.scrollTo(0, 0); // Scroll al inicio al cambiar de página
        }
    };

    return (
        <div className="w-[90%] ml-[5%] border-b border-gray-200 pt-20">
            <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortOpen={sortOpen}
                setSortOpen={setSortOpen}
            />

            <div className="mt-8 w-full grid place-content-center min-h-dvh">
                {loading ? (
                    <div className="flex flex-row gap-2">
                        <div className="grid place-content-center">
                            <TbLoader className="animate-rotate text-gray-600" />
                        </div>
                        <p className="font-semibold text-gray-600">Cargando</p>
                    </div>
                ) : (
                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                                : "flex flex-col space-y-6"
                        }
                    >
                        {lotions.length > 0 ? (
                            lotions.map((lotion) => (
                                <LotionCard viewMode={viewMode} key={lotion.id} lotion={lotion} />
                            ))
                        ) : (
                            <p>No se encontraron lociones.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-10 mb-6">
                <button
                    onClick={handlePreviousPage}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <div className="mx-4 grid place-content-center">
                    <p>
                        {page} de {totalPages}
                    </p>
                </div>
                <button
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                    disabled={page === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default SearchAndFilterBar;