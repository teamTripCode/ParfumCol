import { OrderDto } from "@/types/account";
import axios from "axios";
import { NextResponse } from "next/server";

// Actualizar una orden
export async function PATCH({ params, request }: { params: { orderId: string }; request: Request }) {
    const orderId = params.orderId;  // Obtener el ID de la orden de los parámetros de la URL
    const updateData: Partial<OrderDto> = await request.json();  // Obtener los datos a actualizar

    try {
        // Realiza la solicitud PATCH a tu servicio backend con el ID de la orden y los datos de actualización
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/orders/${orderId}`, updateData);

        // Retorna la respuesta de la API del servicio backend
        return NextResponse.json(res.data);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({
                success: false,
                error: error.message,
            });
        }
    }
}