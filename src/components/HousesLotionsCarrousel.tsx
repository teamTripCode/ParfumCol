"use client"

import { LotionHouse } from '@/types/Lotion';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const HousesLotionsCarrousel = () => {
    const [perfumeHouses, setPerfumeHouses] = useState<LotionHouse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        const fetchPerfumeHouses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/houses_carrousel`);
                if (response.data.success) {
                    setPerfumeHouses(response.data.data);
                } else {
                    setError(response.data.message || 'No se pudieron cargar las lociones.');
                }
            } catch (err) {
                setError('Hubo un error al cargar las lociones. Inténtalo nuevamente más tarde.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfumeHouses();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="w-full overflow-hidden mt-14">
            <div className="relative">
                {/* First row moving left */}
                <div className="flex gap-2 sm:gap-4 animate-scroll-left">
                    {[...perfumeHouses, ...perfumeHouses].map((house, index) => (
                        <div
                            key={`left-${index}`}
                            className="flex-none sm:w-[280px] w-[200px] transition-transform duration-200 hover:scale-110"
                            onClick={() => router.push(`/casas/${house.name}`)}
                        >
                            <div className="h-24 sm:h-32 grid place-content-center bg-white/5 rounded-lg p-4">
                                <div className="w-20 sm:w-24 h-20 sm:h-24 overflow-hidden">
                                    {house.logo ? (
                                        <Image 
                                            src={house.logo} 
                                            width={300} 
                                            height={300} 
                                            alt="logo" 
                                            className="w-full h-full object-contain drop-shadow-lg hover:drop-shadow-2xl transition-all" 
                                        />
                                    ) : (
                                        <svg className="w-20 h-10 text-gray-400" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HousesLotionsCarrousel;
