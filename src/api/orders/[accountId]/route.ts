import { NextRequest, NextResponse } from 'next/server';
import { OrderDto } from '@/types/account';
import axios from 'axios';

export async function POST(
    request: NextRequest,
    { params }: { params: { accountId: string } }
) {
    try {
        const orderDto: OrderDto = await request.json();
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/accounts/${params.accountId}/orders`, 
            JSON.stringify(orderDto)
        );
        if (response.data.success == false) throw new Error(response.data.error);
        const order = response.data.data;
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error creating order:', error);
            return NextResponse.json({ success: false, error: error.message })
        }
    }
}
