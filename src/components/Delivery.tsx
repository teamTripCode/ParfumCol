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

interface DeliveryStepProps {
    number: number;
    title: string;
    description: string;
    status: string;
    Icon: React.ComponentType<{ className?: string }>;
}

const DeliveryStep = ({ number, title, description, status, Icon }: DeliveryStepProps) => (
    <div className="p-6 bg-white shadow-lg rounded-lg relative">
        <span className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
            {number}
        </span>
        <div className="mb-4">
            <Icon className="w-8 h-8 text-gray-800" />
        </div>
        <h3 className="text-xl font-serif mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <p className="text-orange-300 text-sm">{status}</p>
    </div>
);

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
            status: "Autenticidad Garantizada"
        },
        {
            number: 3,
            Icon: BsTruck,
            title: "Recompensas Exclusivas",
            description: "Acumula ParfumCoins con cada compra y úsalos para obtener descuentos o usarlos para comprar.",
            status: "Seguimiento 24/7"
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
                        <div key={infoCard.number} className='border border-gray-300 rounded-xl basis-[300px] grow'>
                            <div className='p-5'>
                                <h3 className='font-extrabold'>{infoCard.title}</h3>
                                <p className='text-sm'>{infoCard.description}</p>
                            </div>
                            <div className='flex flex-row justify-between p-5 border border-t-gray-300'>
                                <p className='text-sm'>Leer Articulo</p>
                                <div className='grid place-content-center'>
                                    <PiArrowUpRightBold size={16} />
                                </div>
                            </div>
                        </div>
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