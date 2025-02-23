"use client";

import { useRouter } from "next/navigation";
import { PiArrowUpRightBold } from "react-icons/pi";

interface DeliveryStepProps {
    number: number;
    title: string;
    description: string;
    status: string;
    Icon: React.ComponentType<{ className?: string }>;
    url: string;
}

function ArticleCart({ infoCard }: { infoCard: DeliveryStepProps }) {
    const router = useRouter();

    return (
        <div key={infoCard.number} className='border border-gray-300 rounded-xl basis-[300px] grow p-1'>
            <div className='p-5'>
                <h3 className='font-extrabold'>{infoCard.title}</h3>
                <p className='text-sm'>{infoCard.description}</p>
            </div>
            <div
                className='flex flex-row justify-between p-5 border border-t-gray-300 cursor-pointer hover:bg-gray-300 rounded-b-xl'
                onClick={() => router.push(infoCard.url)}
            >
                <p className='text-sm'>Leer Articulo</p>
                <div className='grid place-content-center'>
                    <PiArrowUpRightBold size={16} />
                </div>
            </div>
        </div>
    )
}

export default ArticleCart;