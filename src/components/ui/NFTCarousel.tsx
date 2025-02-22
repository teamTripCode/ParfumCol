"use client"

import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './Carousel';

const NFTCard = ({ id, price, date }: any) => (
    <div className="bg-gray-300 rounded-lg overflow-hidden w-64">
        <div className="aspect-square p-4">
            <div className="w-full h-full bg-gray-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">#{id}</span>
            </div>
        </div>
        <div className="p-4 space-y-2">
            <div className="flex flex-col">
                <p className='font-bold'>Direccion</p>
                <span className="font-light text-sm text-gray-600">0x0bhc7t3iig3o892ff3qerg...</span>
                <span className="text-white text-sm">{price} ETH</span>
            </div>
            <div className="text-slate-400 text-sm">
                {date}
            </div>
        </div>
    </div>
);

const NFTCarousel = () => {
    const nfts = [
        { id: '3100', price: '4.2K', date: 'Mar 11, 2021' },
        { id: '7408', price: '4.2K', date: 'Mar 11, 2021' },
        { id: '4156', price: '4.2K', date: 'Dec 09, 2021' },
        { id: '5217', price: '2.2K', date: 'Jul 30, 2021' },
        { id: '5134', price: '2.2K', date: 'Jul 30, 2021' },
        { id: '6344', price: '2.2K', date: 'Jul 30, 2021' },
    ];

    return (
        <div className="w-full mx-auto mt-9">
            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
            >
                <CarouselContent className="-ml-4 mb-3">
                    {nfts.map((nft) => (
                        <CarouselItem key={nft.id} className="pl-4 basis-auto">
                            <NFTCard {...nft} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white hover:bg-gray-100" />
                <CarouselNext className="right-4 bg-white hover:bg-gray-100" />
            </Carousel>
        </div>
    );
};

export default NFTCarousel;