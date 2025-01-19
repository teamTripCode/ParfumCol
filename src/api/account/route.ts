import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AccountDto } from '@/types/account';

const SERVICE_URL = process.env.SERVICE_URL || 'http://localhost:5000/api/accounts';

export async function POST(request: NextRequest) {
    try {
        const accountDto: AccountDto = await request.json();
        const response = await axios.post(SERVICE_URL, accountDto);
        if (response.data.error) throw new Error(response.data.error);
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error('Error creating account:', error);
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message })
        }
    }
}