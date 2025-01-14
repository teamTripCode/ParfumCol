import { LotionDto } from '@/types/Lotion';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import LotionCard from './LotionCard'; // Importamos el componente LotionCard
import FilterBar from './FilterBar'; // Importamos el FilterBar

const SearchAndFilterBar = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortOpen, setSortOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [lotions, setLotions] = useState<LotionDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const fetchLotions = async () => {
        setLoading(true);
        try {
            let url = '';

            if (searchQuery.trim() === '') {
                // Si no hay búsqueda, usamos el endpoint GET para obtener todas las lociones
                url = `http://localhost:3000/admin/all_lotions?page=${page}`;
            } else {
                // Si hay búsqueda, usamos el endpoint POST para filtrar por nombre
                url = 'http://localhost:3000/admin/search_lotion';
            }

            const response = await fetch(url, {
                method: searchQuery.trim() === '' ? 'GET' : 'POST', // Cambiar método según si es GET o POST
                headers: {
                    'Content-Type': 'application/json',
                },
                body: searchQuery.trim() !== '' ? JSON.stringify({
                    name: searchQuery,
                    page,
                    priceOrder: 'asc', // Puedes cambiar este orden si lo deseas
                }) : undefined, // Solo enviar cuerpo si es un POST
            });

            const data = await response.json();

            if (data.success) {
                setLotions(data.data);

                // Ahora usamos totalPages que viene desde el backend
                if (data.pagination) {
                    setTotalPages(data.pagination.totalPages);
                } else {
                    setTotalPages(1); // Si no hay paginación, asignar 1 página
                }
            } else {
                setLotions([]);
                setTotalPages(1); // Establecer una página por defecto si no hay datos
            }
        } catch (error) {
            console.error('Error fetching lotions:', error);
            setLotions([]);
            setTotalPages(1); // Establecer una página por defecto si ocurre un error
        }
        setLoading(false);
    };


    useEffect(() => {
        fetchLotions();
    }, [page, searchQuery]); // Dependemos de `page` y `searchQuery`

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
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

            {/* Lotion List */}
            <div className="mt-8">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-4 gap-6' : 'space-y-6'}>
                        {lotions.length > 0 ? (
                            lotions.map((lotion) => (
                                <LotionCard key={lotion.id} lotion={lotion} />
                            ))
                        ) : (
                            <p>No se encontraron lociones.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 mb-6">
                <button
                    onClick={handlePreviousPage}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <div className="mx-4 grid place-content-center">
                    <p>{page} de {totalPages}</p>
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
