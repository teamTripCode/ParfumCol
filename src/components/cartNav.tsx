import { useCart } from "@/context/cartContext"
import { useRouter } from "next/navigation";
import { TbShoppingCart, TbShoppingCartDollar } from "react-icons/tb"

function CartInNav() {
    const { cartItemsCount } = useCart();
    const router = useRouter()

    const redirectCart = () => router.push('/cart')

    return (
        <div className="grid place-content-center relative">
            {cartItemsCount > 0 ? (
                <TbShoppingCartDollar onClick={redirectCart} size={20} className="text-gray-700 cursor-pointer" />
            ) : (
                <TbShoppingCart onClick={redirectCart} size={20} className="text-gray-700 cursor-pointer" />
            )}
            {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItemsCount}
                </span>
            )}
        </div>
    );
}

export default CartInNav