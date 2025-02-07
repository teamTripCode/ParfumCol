import { LotionDto } from "./Lotion"

export interface OrderDto {
    id?: string
    account?: AccountDto
    accountId: string
    items?: OrderItem[]
    totalAmount: number
    status: orderStatus
    Payment?: Payment;
    createdAt?: Date
    updatedAt?: Date
}

export interface OrderItem {
    id: string
    orderId: string
    order?: OrderDto
    lotionId: string
    lotion?: LotionDto
    quantity: number
    price: number
    totalPrice: number
}

export interface Payment {
    id: string;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    amount: number;
    paymentId?: string
    cardLast4?: string;
    cardBrand?: string;
    order?: OrderDto
    orderId: string
    createdAt: Date
    updatedAt: Date
}

export interface Cart {
    id?: string
    accountId: string
    account?: AccountDto
    items: CartItem[]
    totalAmount: number
    createdAt?: Date
    updatedAt?: Date
}

export interface CartItem {
    id?: string
    cartId: string
    cart?: Cart
    lotionId: string
    lotion?: LotionDto
    quantity: number
    price: number
    totalPrice: number
}

export interface AccountDto {
    id?: string
    name: string
    lastName: string
    email: string
    password: string
    country?: string
    code_country?: string
    city?: string
    phone: string
    identity_number?: string
    type_identity?: TypeIdentity
    home_address?: string
    orders?: OrderDto[]
    cart?: Cart
}

export interface AuthResponse {
    success: boolean;
    accessToken?: string;
    error?: string;
    data?: Omit<AccountDto, 'password'>;
}

export interface JwtPayload {
    accountId: string;
    cartId: string;
    iat: number;
    exp: number;
}



export type orderStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELED";
export type TypeIdentity = 'CC' | 'CE';
export type PaymentMethod = 'CARD' | 'CASH_ON_DELIVERY';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELED';