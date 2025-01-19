import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Agregar item al carrito
export async function POST(
    request: NextRequest,
    { params }: { params: { accountId: string } }
) {
    try {
        const { lotionId, quantity } = await request.json();

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/${params.accountId}/cart`,
            JSON.stringify({ lotionId, quantity })
        );

        if (response.data.success == false) throw new Error(response.data.error);

        const data = response.data
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                },
                { status: 500 }
            );
        }
    }
}

// Eliminar todos los items del carrito
export async function DELETE(
    request: NextRequest,
    { params }: { params: { accountId: string } }
) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/accounts/${params.accountId}/cart`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return NextResponse.json({
            success: true,
            message: 'All items removed from cart'
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'An error occurred'
            },
            { status: 500 }
        );
    }
}