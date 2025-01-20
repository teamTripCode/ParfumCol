"use client"

import axios from "axios"
import Image from "next/image";
import { useEffect, useState } from "react"

function CatalogPreview() {
    const [lotionsImages, setLotionImages] = useState<string[] | null>(null);

    useEffect(() => {
        const GetImages = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/admin/random_covers`)
                if (response.data.success == false) throw new Error(response.data.error);
                const images = response.data.data;
                setLotionImages(images)
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            }
        }

        GetImages()
    }, [])

    return (
        <>
            <div>
                <div className="relative overflow-hidden bg-tranparent top-8">
                    <div className="flex animate-scroll space-x-4">
                        {lotionsImages?.map((lotion, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[400px] h-[400px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] transition-transform duration-500 ease-in-out hover:scale-[0.95]"
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    src={lotion}
                                    alt="lotion"
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CatalogPreview