import { BsCreditCard2Front } from 'react-icons/bs';
import { FaBan, FaCheckCircle, FaTimesCircle, FaTruck, FaUndo } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { OrderDto } from '@/types/account';
import { useRouter } from 'next/navigation';
import { GiTwoCoins } from 'react-icons/gi';

interface OrderCardProps {
    order: OrderDto;
}

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });

const calculateRewards = (amount: number) => (amount * 0.00005).toFixed(3);

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const router = useRouter();

    const paymentMethod = order.Payment?.paymentMethod === 'CARD'
        ? <div className="flex items-center text-green-600"><BsCreditCard2Front className="w-4 h-4 mr-1" />Tarjeta</div>
        : <div className="flex items-center text-blue-600"><FaTruck className="w-4 h-4 mr-1" />Contra entrega</div>;

    return (
        <div className="border border-gray-200 bg-white rounded-lg p-6 mb-4">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-gray-600">Pedido {order?.id?.slice(0, 7)}</h3>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{formatDate(String(order?.createdAt))}</span>
                </div>
                {paymentMethod}
            </div>
            <div className="space-y-3">
                {order?.items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="text-gray-400">×</div>
                            <span>{item.quantity}</span>
                            <span className="text-gray-700">{item?.lotion?.name}</span>
                        </div>
                        <span className="text-gray-600">{formatCurrency(item.totalPrice)}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium">Total</span>
                    <span className="text-lg font-semibold">{formatCurrency(order.totalAmount)}</span>
                </div>
                {order.Payment && order.Payment.status === "COMPLETED" && (
                    <div className="text-purple-600 flex items-center gap-1 bg-gray-200">
                        <FaCheckCircle className="w-4 h-4" />
                        Ganaste {calculateRewards(order.totalAmount)} ETH en recompensas
                    </div>
                )}
                {order.Payment && order.Payment.status === "FAILED" && (
                    <div className="text-red-600 flex items-center gap-1 text-sm bg-gray-100 p-2 rounded-md">
                        <FaTimesCircle className="w-4 h-4" />
                        Pago fallido. Por favor, intenta nuevamente.
                    </div>
                )}
                {order.Payment && order.Payment.status === "REFUNDED" && (
                    <div className="text-yellow-600 flex items-center gap-1">
                        <FaUndo className="w-4 h-4" />
                        Pago reembolsado. Revisa tu cuenta bancaria.
                    </div>
                )}
                {order.Payment && order.Payment.status === "CANCELED" && (
                    <div className="text-gray-600 flex items-center gap-1">
                        <FaBan className="w-4 h-4" />
                        Pedido cancelado. Contacta soporte si tienes dudas.
                    </div>
                )}

                <div className="text-blue-600 flex items-center gap-1 text-sm bg-blue-100 p-2 rounded-md">
                    <GiTwoCoins className="w-4 h-4 text-blue-600 drop-shadow-md" />
                    Obtuviste 0.1345913 ETH en esta compra
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    className="text-gray-500 text-sm hover:text-gray-700 flex items-center gap-1"
                    onClick={() => router.push(`/orders/${order.id}`)}
                >
                    Ver detalles del pedido
                    <HiOutlineExternalLink className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default OrderCard;