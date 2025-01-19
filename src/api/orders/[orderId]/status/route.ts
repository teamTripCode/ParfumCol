import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { orderId: string } }
) {
    try {
        const { status } = await request.json();

        if (!status) {
            return NextResponse.json(
                { success: false, error: 'Status is required' },
                { status: 400 }
            );
        }

        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/orders/${params.orderId}/status`,
            { status },
        );

        return NextResponse.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message })
        }
    }
}