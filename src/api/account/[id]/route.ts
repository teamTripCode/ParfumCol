import { AccountDto, OrderDto } from "@/types/account";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const SERVICE_URL = process.env.SERVICE_URL || 'http://localhost:3000';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const updateData: AccountDto = await request.json();
        const response = await axios.patch(`${SERVICE_URL}/accounts/${id}`, JSON.stringify(updateData));
        if (response.data.success == false) throw new Error(response.data.error);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error updating account:', error);
        return NextResponse.json(
            { error: 'Failed to update account' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const response = await axios.delete(`${SERVICE_URL}/accounts/${id}`);
        if (response.data.success == false) throw new Error(response.data.error);
        return NextResponse.json(response.data.data);
    } catch (error) {
        console.error('Error deleting account:', error);
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message })
        }
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const orderDto: OrderDto = await request.json();
        const response = await axios.post(`${SERVICE_URL}/accounts/${params.id}/orders`, JSON.stringify(orderDto));
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