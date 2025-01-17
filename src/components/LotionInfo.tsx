"use client"

import ImageCarouselLotion from "@/components/ImagesOnlyLotion"
import { LotionDto } from "@/types/Lotion"
import axios from "axios"
import { useEffect, useState } from "react"
import { formatToCOP } from "@/handlers/FormatToCop"
import { useRouter } from "next/navigation"
import { TbArrowLeft } from "react-icons/tb"

function LotionInfo({ lotionId }: { lotionId: string }) {
    const [infoLotion, setInfoLotion] = useState<LotionDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState<number>(1)

    const router = useRouter()

    const countCart = ({ isAdd, isReduce }: { isAdd?: boolean, isReduce?: boolean }) => {
        if (isAdd) setCount(count + 1);
        if (isReduce && count > 1) setCount(count - 1);
    }

    useEffect(() => {
        const getInfoLotion = async () => {
            try {
                setLoading(true);
                // Loguear la URL para debug
                const url = `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/lotion/${lotionId}`;
                console.log('Fetching from URL:', url);

                const resLotion = await axios.get(url);
                console.log('Response:', resLotion);

                if (!resLotion.data.success) {
                    throw new Error(resLotion.data.error);
                }

                setInfoLotion(resLotion.data.data);
            } catch (error) {
                console.error('Full error:', error);
                setError(error instanceof Error ? error.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        if (lotionId) {
            getInfoLotion();
        }
    }, [lotionId]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return (
            <div>
                <h2>Error al cargar la información:</h2>
                <p>{error}</p>
                <p>ID de loción: {lotionId}</p>
            </div>
        );
    }

    if (!infoLotion) {
        return <div>No se encontró información para la loción ID: {lotionId}</div>;
    }

    const chords = () => {
        console.log('Tipo de infoLotion.chords:', typeof infoLotion.chords); // Verificar el tipo
        console.log('Valor de infoLotion.chords:', infoLotion.chords); // Verificar el contenido

        if (typeof infoLotion.chords === 'string') {
            return infoLotion.chords.split(',');
        }

        // Si no es una cadena, retornar el valor directamente o manejarlo según sea necesario
        return infoLotion.chords || [];
    };


    return (
        <>
            <div className="pt-32 w-[90%] ml-[5%] mb-10 flex justify-start">
                <div className="grid place-content-center" onClick={() => router.push('/catalogo')}>
                    <div className="flex flex-row gap-1 bg-gray-200 px-2 py-1 rounded-md text-gray-600 cursor-pointer hover:bg-gray-300">
                        <div className="grid place-content-center">
                            <TbArrowLeft />
                        </div>
                        <p>Atras</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap w-[90%] ml-[5%] min-h-dvh gap-12 md:gap-2 mb-10">
                <div className="flex basis-[400px] grow">
                    {infoLotion.images && infoLotion.images.length > 0 ? (
                        <ImageCarouselLotion imageUrls={infoLotion.images} />
                    ) : (
                        <p>No hay imágenes disponibles</p>
                    )}
                </div>
                <div className="basis-[400px] grow">
                    <div className="flex flex-col">
                        <h3 className="font-thin text-gray-900 mb-3">{infoLotion.brand}</h3>
                        <h1 className="text-3xl font-medium">{infoLotion.name}</h1>
                        <h5 className="font-light text-gray-700">{infoLotion.genre}</h5>
                    </div>

                    <h3 className="mt-6 text-4xl mb-3">{formatToCOP(infoLotion.price)}</h3>

                    <div className="flex flex-start gap-2">
                        <div className="flex flex-row gap-4 px-2 py-1 bg-gray-300 rounded-lg">
                            <p className="cursor-pointer text-base" onClick={() => countCart({ isReduce: true })}>-</p>
                            <p className="cursor-pointer text-sm grid place-content-center">{count}</p>
                            <p className="cursor-pointer text-base" onClick={() => countCart({ isAdd: true })}>+</p>
                        </div>
                        <div className="bg-black rounded-lg grid place-content-center px-2 cursor-pointer">
                            <p className="text-sm text-white">Agregar al carrito</p>
                        </div>
                    </div>

                    <p>{infoLotion.description}</p>

                    <div className="mt-10 mb-7">
                        <h3 className="font-semibold text-gray-500 mb-1">Notas Olfativas</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {chords().map((chord, index) => (
                                <div key={index} className="p-1 border border-gray-300 hover:border-gray-500 bg-gray-100 rounded-lg grid place-content-center">
                                    <p className="text-center text-sm font-semibold text-gray-600">{chord}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LotionInfo;  