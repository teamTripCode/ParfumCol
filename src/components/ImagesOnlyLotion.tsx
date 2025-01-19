'use client'

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ImageCarouselProps {
    imageUrls: string[];
}

const ImageCarouselLotion: React.FC<ImageCarouselProps> = ({ imageUrls }) => {
    // Inicializamos con null en lugar de string vacío
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (imageUrls && imageUrls.length > 0) {
            setSelectedImage(imageUrls[0]);
        }
    }, [imageUrls]);

    if (!imageUrls || imageUrls.length === 0) {
        return <div>No hay imágenes disponibles</div>;
    }

    // No renderizamos la imagen si selectedImage es null
    if (!selectedImage) {
        return <div>Cargando imagen...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Imagen grande */}
            <div className="w-full max-w-lg">
                <Image
                    width={500}
                    height={500}
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                />
            </div>

            {/* Carrusel de imágenes */}
            <div className="flex gap-4 overflow-x-auto w-full max-w-lg">
                {imageUrls.map((url, index) => (
                    <button
                        key={index}
                        className={`flex-none w-24 h-24 rounded-lg border-2 ${selectedImage === url
                            ? "border-blue-500"
                            : "border-transparent hover:border-gray-300"
                            }`}
                        onClick={() => setSelectedImage(url)}
                    >
                        <Image
                            width={500}
                            height={500}
                            src={url}
                            alt={`Thumbnail ${index}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageCarouselLotion;