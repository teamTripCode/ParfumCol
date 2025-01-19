import { LotionDto } from "./Lotion"

export interface OrderDto {
    id?: string
    account?: AccountDto
    accountId: string
    items: OrderItem[]
    totalAmount: number
    status: orderStatus
    createdAt?: Date
    updatedAt?: Date
}

export interface OrderItem {
    id: string
    orderId: string
    order: OrderDto
    lotionId: string
    lotion: LotionDto
    quantity: number
    price: number
    totalPrice: number
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
    country: string
    code_country: string
    city: string
    phone: string
    home_address: string
    orders?: OrderDto[]
    cart?: Cart
}

export interface AuthResponse {
    success: boolean;
    access_token?: string; // El token está en el nivel superior.
    error?: string; // Mensaje de error en caso de fallo.
    data?: {
        user: AccountDto; // Información del usuario.
    };
}



export type orderStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELED";