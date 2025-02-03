"use client";
import { useCart } from "@/context/cartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

function CartInNav() {
    const { cartItemsCount } = useCart();
    const router = useRouter();

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-black"
                onClick={() => router.push("/cart")}
            >
                <ShoppingCart className="h-5 w-5" />
            </Button>
            {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center animate-pulse">
                    {cartItemsCount}
                </span>
            )}
        </div>
    );
}

export default CartInNav;