"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RiImageCircleAiLine } from "react-icons/ri";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import LotionCard from "@/components/LotionCard";  // Importamos el componente LotionCard
import { LotionDto } from "@/types/Lotion";

interface Params {
    [key: string]: string;
    brand: string;
}

interface InfoLotion {
    id: string;
    name: string;
    logo: string | null;
    createdAt: string;
    updatedAt: string;
}

function LotionsByBrands() {
    const params = useParams<Params>();
    const { brand } = params;

    const [infoLotion, setInfoLotion] = useState<InfoLotion | null>(null);
    const [lotions, setLotions] = useState<LotionDto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getInfoHouse = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/house/${brand}`);
                setInfoLotion(response.data.data);
            } catch (error) {
                console.error("Error fetching info house:", error);
            }
        };

        const getLotionsByBrand = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/house/${brand}/lotions`, {
                    params: { page: currentPage },
                });
                setLotions(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            } catch (error) {
                console.error("Error fetching lotions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (brand) {
            getInfoHouse();
            getLotionsByBrand();
        }
    }, [brand, currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (!brand) {
        return <p>Cargando marca...</p>;
    }

    return (
        <>
            <NavBar />
            <div className="mt-32 w-[90%] ml-[5%]">
                <div className="">
                    <div className="grid place-content-center">
                        {infoLotion?.logo == null ? (
                            <RiImageCircleAiLine size={80} />
                        ) : (
                            <Image src={infoLotion.logo} alt={"logo"} width={150} height={150} className="drop-shadow-xl" />
                        )}
                    </div>
                    {/* <h1 className="grid place-content-center text-2xl">{infoLotion?.name}</h1> */}
                </div>

                {/* Grid de lociones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
                    {isLoading ? (
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 rounded-2xl h-64 w-full" />
                            </div>
                        ))
                    ) : (
                        lotions.map((lotion) => (
                            <LotionCard key={lotion.id} lotion={lotion} />  // Usamos el componente LotionCard
                        ))
                    )}
                </div>

                {/* Paginación */}
                <div className="flex justify-center items-center mt-12 space-x-3">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <MdNavigateBefore className="w-4 h-4" />
                        <span className="text-sm">Anterior</span>
                    </button>

                    <div className="flex items-center space-x-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${currentPage === i + 1 ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <span className="text-sm">Siguiente</span>
                        <MdNavigateNext className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default LotionsByBrands;
