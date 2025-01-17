import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaFilter } from 'react-icons/fa';

const FilterBar = ({
    searchQuery,
    setSearchQuery,
    setViewMode,
    sortOpen,
    setSortOpen,
}: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    viewMode: string;
    setViewMode: React.Dispatch<React.SetStateAction<string>>;
    sortOpen: boolean;
    setSortOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [isFilterVisible, setFilterVisible] = useState(false);

    // Forzar vista en lista en móviles
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setViewMode('list'); // Forzar vista en lista
            }
        };

        handleResize(); // Asegurarse de aplicar en el primer render
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [setViewMode]);

    return (
        <div className="w-full border-b border-gray-200 pt-10">
            <div className="max-w-7xl mx-auto px-4 py-4">
                {/* Botón de filtro para móviles */}
                <div className="flex items-center justify-between md:hidden">
                    <button
                        onClick={() => setFilterVisible(!isFilterVisible)}
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                        <FaFilter className="w-5 h-5" />
                        <span>Filtros</span>
                    </button>
                </div>

                {/* Contenido del filtro */}
                <div
                    className={`${isFilterVisible ? 'block' : 'hidden'
                        } mt-4 md:flex md:items-center md:justify-between md:space-x-8`}
                >
                    {/* Barra de búsqueda */}
                    <div className="flex items-center flex-1 max-w-md">
                        <FaSearch className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o marca"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full ml-2 outline-none text-sm text-gray-600 placeholder-gray-400 px-4 rounded-md py-2"
                        />
                    </div>

                    {/* Opciones de filtro */}
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        {/* Ordenar */}
                        <div className="relative">
                            <button
                                onClick={() => setSortOpen(!sortOpen)}
                                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                            >
                                <span>Ordenar por</span>
                                <FaChevronDown className="w-4 h-4" />
                            </button>

                            {sortOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Precio: Mayor a menor
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Precio: Menor a mayor
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Más recientes
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Alfabético
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Filtros adicionales */}
                        <button className="text-sm text-gray-600 hover:text-gray-900">Masculino</button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">Femenino</button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">Unisex</button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">Solo disponibles</button>

                        {/* Alternar vista (solo en escritorio) */}
                        <div className="hidden md:flex items-center space-x-2 border-l border-gray-200 pl-6">
                            {/* Estos botones ya no se muestran en móvil */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
