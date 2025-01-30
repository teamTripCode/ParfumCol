import { LotionHouse } from '@/types/Lotion';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

const HousesLotionsCarrousel = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [perfumeHouses, setPerfumeHouses] = useState<LotionHouse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX);
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX);
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    if (loading) {
        return <div className="text-center mt-10">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="w-[90%] ml-[5%] mx-auto mt-32 p-4 md:p-10 rounded-md bg-gray-100">
            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 md:gap-6 px-2 md:px-4 cursor-grab active:cursor-grabbing scroll-smooth"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseUp}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollSnapType: 'x mandatory',
                        scrollBehavior: 'smooth'
                    }}
                >
                    {perfumeHouses.map((house, index) => (
                        <div
                            key={index}
                            className="flex-none w-[80vw] md:w-64 snap-center transform transition-transform duration-300"
                        >
                            <div className="border border-gray-100 rounded-lg p-4 md:p-6 h-40 md:h-48 flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-all duration-300 bg-white">
                                <div className="w-28 h-12 rounded-full flex items-center justify-center">
                                    {house.logo ? (
                                        <Image src={house.logo} width={300} height={300} alt="logo" className='w-52 h-auto drop-shadow-xl' />
                                    ) : (
                                        <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    )}
                                </div>
                                {/* <div className="text-center">
                                    <h3 className="font-medium text-lg">{house.name}</h3>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center mt-8 flex flex-wrap gap-5 justify-between">
                <div className="grid place-content-center">
                    <p className="text-gray-500 text-start">
                        Descubra nuestra colección de prestigiosas casas de perfumes
                    </p>
                </div>
                <button
                    className="text-sm text-blue-100 hover:text-blue-50 font-medium px-4 py-2 bg-blue-500 rounded-md"
                    onClick={() => router.push('/casas')}
                >
                    Ver mas
                </button>
            </div>
        </div>
    );
};

export default HousesLotionsCarrousel;