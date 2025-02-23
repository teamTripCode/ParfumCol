import React from 'react';
import {
    BsFileEarmarkText,
    BsShieldCheck,
    BsTruck,
    BsCheckCircle
} from 'react-icons/bs';
import { PiArrowUpRightBold } from "react-icons/pi";
import Sellers from './Salles';
import CoinStatus from './CoinWarns';
import ArticleCart from './articleCart';
import { url } from 'inspector';

interface DeliveryStepProps {
    number: number;
    title: string;
    description: string;
    status: string;
    url: string
    Icon: React.ComponentType<{ className?: string }>;
}

const BlockchainDeliverySection = () => {
    const deliverySteps = [
        {
            number: 1,
            Icon: BsFileEarmarkText,
            title: "Inmutable y Segura",
            description: "Cada transacción queda registrada en la blockchain y no puede ser modificada.",
            url: ""
        },
        {
            number: 2,
            Icon: BsShieldCheck,
            title: "Transparencia Total",
            description: "Consulta tu historial de compras sin intermediarios ni riesgos de fraude.",
            status: "Autenticidad Garantizada",
            url: ""
        },
        {
            number: 3,
            Icon: BsTruck,
            title: "Recompensas Exclusivas",
            description: "Acumula ParfumCoins con cada compra y úsalos para obtener descuentos o usarlos para comprar.",
            status: "Seguimiento 24/7",
            url: "",
        },
    ];

    return (
        <>
            <div className='min-h-dvh grid place-content-center w-[90%] ml-[5%]'>
                <div className="max-w-6xl mx-auto px-4 py-16 md:mt-0 mt-9">
                    <div className="text-center">
                        <h2 className="text-4xl font-serif mb-4">
                            Blockchain
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Cada entrega está asegurada por tecnología blockchain, garantizando la
                            autenticidad y trazabilidad de su perfume de lujo desde nuestro provedor hasta sus
                            manos.
                        </p>
                    </div>
                </div>

                <div className='flex flex-wrap gap-6'>
                    {deliverySteps.map((infoCard) => (
                        <ArticleCart infoCard={infoCard as DeliveryStepProps} />
                    ))}
                </div>
            </div>

            <div className='w-[90%] ml-[5%] mt-9'>
                <div className='flex flex-wrap justify-between gap-5'>
                    <div className='basis-[400px] grow'>
                        <h3 className='text-2xl font-bold'>Conozca los aromas</h3>
                    </div>

                    <div className='basis-[400px] grow'>
                        <p>Cada loción en nuestra colección no solo tiene un aroma único, sino también una historia y una garantía de autenticidad asegurada con blockchain. Con TripCode, cada compra se registra de forma inmutable, garantizando la trazabilidad desde el origen hasta tus manos. Además, al comprar, ganas PerfumeCoins, nuestra criptomoneda exclusiva, que puedes usar para descuentos y recompensas especiales. Experimenta fragancias premium con total seguridad, transparencia y beneficios únicos.</p>
                        <div className='flex flex-wrap mt-5'>
                            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">Ver ParfumCoin</button>

                            <button type="button" className="text-gray-900 bg-transparent border border-gray-400 hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600">Explorar todas las casas de perfumeria</button>
                        </div>
                    </div>
                </div>
            </div>

            <CoinStatus />

            <Sellers />
        </>
    );
};

export default BlockchainDeliverySection;