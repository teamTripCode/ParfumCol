import React from 'react';
import { FaSearch, FaChevronDown, FaTh, FaList } from 'react-icons/fa';

const FilterBar = ({
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    sortOpen,
    setSortOpen
}: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    viewMode: string;
    setViewMode: React.Dispatch<React.SetStateAction<string>>;
    sortOpen: boolean;
    setSortOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <div className="w-full border-b border-gray-200 pt-10">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between space-x-8">
                    {/* Search Bar */}
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

                    {/* Filters */}
                    <div className="flex items-center space-x-6">
                        {/* Sort Dropdown */}
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

                        {/* Genre Filters */}
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                            Masculino
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                            Femenino
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                            Unisex
                        </button>

                        {/* Availability Filter */}
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                            Solo disponibles
                        </button>

                        {/* View Toggle */}
                        <div className="flex items-center space-x-2 border-l border-gray-200 pl-6">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1 rounded ${viewMode === 'grid' ? 'text-gray-900' : 'text-gray-400'}`}
                            >
                                <FaTh className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1 rounded ${viewMode === 'list' ? 'text-gray-900' : 'text-gray-400'}`}
                            >
                                <FaList className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
