"use client"

import NavBar from "@/components/NavBar"
import ShoppingCart from "@/components/ShoppingCart"
import { OrderItem } from "@/types/account"
import axios from "axios"
import { useEffect, useState } from "react"

function Cart() {
    const [items, setItems] = useState<OrderItem[] | null>(null)

    const handleUpdateQuantity = (itemId: string, newQuantity: number) => { }
    const handleRemoveItem = (itemId: string) => { }

    useEffect(() => {
        const getDataCart = async () => {
            let cartId: string = "";
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/accounts/cart/${cartId}`)
                console.log(response)
            } catch (error) {

            }
        }

        getDataCart()
    }, [])

    return (
        <>
            <NavBar />
            <ShoppingCart items={items as OrderItem[]} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
        </>
    )
}

export default Cart