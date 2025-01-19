import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { accountId: string; itemId: string } }
) {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/accounts${params.accountId}/cart/${params.itemId}`
        );
        if (response.data.success == false) throw new Error(response.data.error);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    error: error.message
                },
                { status: 500 }
            );
        }
    }
}