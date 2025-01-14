import React from 'react';
import { LotionDto } from '@/types/Lotion';
import Image from 'next/image';

interface LotionCardProps {
    lotion: LotionDto;
}

const LotionCard = ({ lotion }: LotionCardProps) => {
    return (
        <div className="max-w-xs">
            <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative pb-4">
                    <Image
                        width={500}
                        height={500}
                        src={lotion.images[0]}
                        alt={lotion.name}
                        className="w-full h-64 object-contain bg-sky-50"
                    />
                </div>

                <div className="p-4">
                    <div className="uppercase text-gray-500 text-xs mb-1">
                        {lotion.brand}
                    </div>

                    <h3 className="font-serif text-xl mb-2">
                        {lotion.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3">
                        {lotion.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-lg">€{lotion.price}</span>
                        <button className="text-orange-600 hover:text-orange-700 text-sm">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LotionCard;