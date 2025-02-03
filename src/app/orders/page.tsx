"use client";

import React, { useState, useEffect } from "react";
import OrderCard from "@/components/OrderCard";
import { OrderDto, orderStatus } from "@/types/account";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import NavBar from "@/components/NavBar";

interface Tab {
    id: string;
    label: string;
    status?: orderStatus[];
}

const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState<string>("all");
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const { user } = useAuth();

    // Generate sample orders with realistic data
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND}/accounts/${user?.id}/orders`)
                if (response.data.success == false) throw new Error(response.data.error);
                console.log(response.data.data)
                setOrders(response.data.data);
            } catch (error) {
                console.log(error)
            }
        }

        getOrders()
    }, [user]);

    const tabs: Tab[] = [
        { id: "all", label: "Todos" },
        { id: "processing", label: "En Proceso", status: ["SHIPPED"] },
        { id: "delivered", label: "Entregados", status: ["DELIVERED"] }
    ];

    // Filter orders based on the selected tab
    const filteredOrders = orders.filter((order) => {
        const activeTabConfig = tabs.find((tab) => tab.id === activeTab);
        return !activeTabConfig?.status || activeTabConfig.status.includes(order.status);
    });

    return (
        <>
            <NavBar />
            <div className="w-[90%] ml-[5%] px-4 py-8 mt-20">
                <h1 className="text-2xl font-bold mb-6">Mis Pedidos</h1>
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 px-1 ${activeTab === tab.id
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
                    ) : (
                        <p>No hay pedidos disponibles.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrdersPage;