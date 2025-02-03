"use client";

import NavBar from "@/components/NavBar";
import { OrderDto, Payment, OrderItem } from "@/types/account";
import axios from "axios";
import { CircleCheck, CircleX, FileText, RotateCcw } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface OrderOnlyProps {
    params: Promise<{ orderId: string }>
}

function OrderOnly({ params }: OrderOnlyProps) {
    const resParams = use(params);
    const { orderId } = resParams;

    const [order, setOrder] = useState<OrderDto | null>(null);
    const [payment, setPayment] = useState<Payment | null>(null);
    const [items, setItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/accounts/orders/${orderId}`
                );

                if (!response.data.success) throw new Error(response.data.error);

                const data: OrderDto = response.data.data;

                // Separar estados
                setOrder({
                    id: data.id,
                    accountId: data.accountId,
                    totalAmount: data.totalAmount,
                    status: data.status,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                });

                if (data.Payment) {
                    setPayment(data.Payment);
                }

                setItems(data.items as OrderItem[]);
            } catch (error) {
                console.error("Error al obtener la orden:", error);
            }
        };

        if (orderId) getOrder();
    }, [orderId]);

    return (
        <>
            <NavBar />
            <div className="mt-28 w-[90%] ml-[5%] flex flex-col gap-4">
                <div className="rounded-xl flex flex-wrap-reverse gap-6">
                    <div className="flex-1">
                        <div className="flex flex-wrap-reverse justify-between gap-3">
                            <div>
                                <h1 className="text-2xl font-light text-gray-800 mb-1">Detalles de la Orden</h1>
                            </div>

                            <div className="relative top-0">
                                <p className="bg-green-100 text-green-600 px-4 py-1 text-sm font-medium rounded-full shadow-md">
                                    {order?.status}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between mt-3 mb-2 bg-white p-3 gap-2 rounded-md shadow-md">
                            <div>
                                <h3 className="font-semibold text-xl text-gray-500 mb-1">Destino de la orden</h3>
                                <p>
                                    <span className="font-semibold">Dirección: </span>
                                    Cra 24e #4-97 oeste - Cali, Valle del Cauca - Colombia
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 mt-4">

                            <div className="flex flex-row justify-between gap-3 bg-white p-3 rounded-lg shadow-md">
                                <div>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Fecha de Creación:</span>{" "}
                                        {order?.createdAt?.toString().slice(0, 10)}
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        <span className="font-semibold">Hash Validador: </span> {orderId}
                                    </p>
                                </div>
                                <CircleCheck className="text-green-500 drop-shadow-md" size={20} />
                            </div>

                            <div className="flex flex-row justify-between gap-3 bg-white p-3 rounded-lg shadow-md">
                                <div>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Fecha de Finalización:</span> En proceso ...
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        <span className="font-semibold">Hash Validador: </span> En proceso ...
                                    </p>
                                </div>
                                <CircleCheck className="text-green-500 drop-shadow-md" size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl flex flex-wrap-reverse gap-6 mt-3">
                    <div className="flex-1">
                        <div className="flex flex-wrap-reverse justify-between">
                            <div>
                                <h1 className="text-2xl font-light text-gray-800 mb-1">Detalles de pago</h1>
                            </div>
                            <div className="relative top-0">
                                <p className="bg-green-100 text-green-600 px-4 py-1 text-sm font-medium rounded-full shadow-sm">
                                    {payment?.status}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 justify-between mt-3">
                            <div className="flex grow flex-wrap gap-3">
                                <div className="flex grow flex-col p-3 bg-white rounded-lg">
                                    <p className="font-semibold text-lg text-gray-600">Metodo de pago</p>
                                    <p className="text-sm">
                                        {payment?.paymentMethod == "CARD" && "Tarjeta Debito/Credito"}
                                        {payment?.paymentMethod == "CASH_ON_DELIVERY" && "Pago contra entrega"}
                                    </p>
                                </div>

                                <div className="flex grow flex-col p-3 bg-white rounded-lg">
                                    <p className="font-semibold text-lg text-gray-600">Informacion de pago</p>
                                    <p className="text-sm">
                                        {payment?.cardBrand} **** {payment?.cardLast4}
                                    </p>
                                </div>

                                <div className="flex grow flex-col p-3 bg-white rounded-lg">
                                    <p className="font-semibold text-lg text-gray-600">Bloque de registro de pago exitoso</p>
                                    <p className="text-sm">0x00kdbf387t513ui13orn143y83734uoipj</p>
                                </div>

                                <div className="flex grow flex-col p-3 bg-white rounded-lg">
                                    <p className="font-semibold text-lg text-gray-600">Recompensa por compra</p>
                                    <p className="text-sm">00.01345 ETH</p>
                                </div>
                            </div>


                            <div className="flex justify-between gap-2">
                                <div>
                                    <p className="font-semibold text-2xl text-gray-600">Monto Total</p>
                                    <p className="text-sm">$ {order?.totalAmount}</p>
                                </div>

                                <div className="grid place-content-center">
                                    <div className="flex flex-row bg-blue-100 shadow-md px-4 py-2 rounded-md gap-1 cursor-pointer hover:bg-blue-200">
                                        <div className="grid place-content-center">
                                            <RotateCcw size={20} className="text-blue-600" />
                                        </div>
                                        <p className="text-sm text-blue-600">Reintentar pago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl flex flex-col gap-6 mt-3 mb-5">
                    <h1 className="text-2xl font-light text-gray-800">Productos</h1>

                    {items.map((item) => (
                        <div key={item.id} className="flex flex-row justify-between gap-3 bg-white p-3 rounded-lg shadow-md">
                            <div className="flex flex-row gap-2">
                                <div className="grid place-content-center">
                                    <Image src={item.lotion?.images[0] as string} alt={"icon"} width={70} height={70} />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{item.lotion?.brand} - {item.lotion?.name}</p>
                                    <p className="text-sm">Cantidad: {item.quantity}</p>
                                </div>
                            </div>

                            <div className="flex items-end">
                                <p>${item.totalPrice}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-3">
                    <button
                        type="button"
                        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                    >
                        <CircleX className="mr-2 text-red-700" size={18} />
                        <p className="grid place-content-center">Cancelar orden</p>
                    </button>

                    <button
                        type="button"
                        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                    >
                        <FileText className="mr-2 text-red-700" size={18} />
                        <p className="grid place-content-center">Descargar Factura</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default OrderOnly;
