import React from 'react';
import { LotionDto } from '@/types/Lotion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatToCOP } from '@/handlers/FormatToCop';

interface LotionCardProps {
    lotion: LotionDto;
}

const LotionCard = ({ lotion }: LotionCardProps) => {
    const router = useRouter();

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Imagen */}
            <div className="relative bg-sky-50 pb-4">
                <Image
                    width={500}
                    height={500}
                    src={lotion.images[0]}
                    alt={lotion.name}
                    className="w-full h-48 object-contain"
                />
            </div>

            {/* Información */}
            <div className="p-4">
                <div className="uppercase text-gray-500 text-xs mb-1">{lotion.brand}</div>
                <h3 className="font-serif text-xl mb-2 line-clamp-1">{lotion.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {lotion.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{formatToCOP(lotion.price)}</span>
                    <button
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors duration-300"
                        onClick={() => router.push(`lotion/${lotion.id}`)}
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LotionCard;