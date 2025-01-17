import React from 'react';
import { LotionDto } from '@/types/Lotion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatToCOP } from '@/handlers/FormatToCop';

interface LotionCardProps {
    lotion: LotionDto;
    viewMode: string; // Puede ser 'grid' o 'list'
}

const LotionCard = ({ lotion, viewMode }: LotionCardProps) => {
    const router = useRouter();

    return (
        <div
            className={`${viewMode === 'list' ? 'flex items-start space-x-4' : 'w-full'
                } bg-white rounded-lg overflow-hidden`}
        >
            {/* Imagen */}
            <div
                className={`${viewMode === 'list' ? 'w-1/3' : 'relative pb-4'
                    } bg-sky-50`}
            >
                <Image
                    width={500}
                    height={500}
                    src={lotion.images[0]}
                    alt={lotion.name}
                    className={`${viewMode === 'list' ? 'h-32 object-contain' : 'w-full h-64 object-contain'
                        }`}
                />
            </div>

            {/* Información */}
            <div className={`${viewMode === 'list' ? 'w-2/3 p-4' : 'p-4'}`}>
                <div className="uppercase text-gray-500 text-xs mb-1">{lotion.brand}</div>

                <h3 className="font-serif text-xl mb-2">{lotion.name}</h3>

                <p className={`text-sm text-gray-600 ${viewMode === 'list' ? 'mb-2' : 'mb-3'}`}>
                    {lotion.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-lg">{formatToCOP(lotion.price)}</span>
                    <button
                        className="text-orange-600 hover:text-orange-700 text-sm"
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
