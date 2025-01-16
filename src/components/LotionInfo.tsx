"use client"

import ImageCarouselLotion from "@/components/ImagesOnlyLotion"
import { LotionDto } from "@/types/Lotion"
import axios from "axios"
import { useEffect, useState } from "react"

function LotionInfo({ lotionId }: { lotionId: string }) {
    const [infoLotion, setInfoLotion] = useState<LotionDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <h1>Loción ID: {lotionId}</h1>
            {infoLotion.images && infoLotion.images.length > 0 ? (
                <ImageCarouselLotion imageUrls={infoLotion.images} />
            ) : (
                <p>No hay imágenes disponibles</p>
            )}
        </>
    );
}

export default LotionInfo;  