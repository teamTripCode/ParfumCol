import React from 'react';
import {
    BsFileEarmarkText,
    BsShieldCheck,
    BsTruck,
    BsCheckCircle
} from 'react-icons/bs';

const DeliveryStep = ({ number, title, description, status, Icon }) => (
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
            title: "Creación de Smart Contract",
            description: "Generación automática de contrato digital para garantizar la autenticidad",
            status: "100% Verificado"
        },
        {
            number: 2,
            Icon: BsShieldCheck,
            title: "Verificación de Producto",
            description: "Autenticación y registro del producto en la blockchain",
            status: "Autenticidad Garantizada"
        },
        {
            number: 3,
            Icon: BsTruck,
            title: "Trazabilidad Blockchain",
            description: "Seguimiento en tiempo real con registro immutable",
            status: "Seguimiento 24/7"
        },
        {
            number: 4,
            Icon: BsCheckCircle,
            title: "Confirmación en Cadena",
            description: "Verificación final y registro permanente de entrega",
            status: "Entrega Segura"
        }
    ];

    return (
        <div className='min-h-dvh grid place-content-center'>
            <div className="max-w-6xl mx-auto px-4 py-16 md:mt-0 mt-9">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif mb-4">
                        Entrega Verificada por Blockchain
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Cada entrega está asegurada por tecnología blockchain, garantizando la
                        autenticidad y trazabilidad de su perfume de lujo desde nuestro provedor hasta sus
                        manos.
                    </p>
                    <div className="mt-12 mb-16">
                        <div className="text-5xl font-serif mb-2">15,783</div>
                        <div className="text-sm text-gray-500">
                            ENTREGAS VERIFICADAS POR BLOCKCHAIN
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {deliverySteps.map((step) => (
                        <DeliveryStep
                            key={step.number}
                            number={step.number}
                            Icon={step.Icon}
                            title={step.title}
                            description={step.description}
                            status={step.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlockchainDeliverySection;