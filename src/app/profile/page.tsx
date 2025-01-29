"use client"

import { useEffect, useState } from "react";
import UpdateProfileForm from "@/components/formProfile";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context/authContext";
import { TbDatabaseCog, TbMailbox } from "react-icons/tb";
import { AccountDto } from "@/types/account";
import AddressForm from "@/components/AddresForm";
import { GrTransaction } from "react-icons/gr";
import { PiArrowUpRightBold } from "react-icons/pi";

interface UserData {
    email: string;
    names: string;
    lastNames: string;
    phone: string;
    addressOfResidence?: string; // Puedes ponerlo como opcional si no siempre está presente
    country?: string | null;
    city?: string | null;
}


function Profile() {
    const { user } = useAuth();

    const [userData, setUserData] = useState<any>({
        email: '',
        names: '',
        lastNames: '',
        phone: '',
        addressOfResidence: '',
        country: null,
        city: null
    });

    useEffect(() => {
        if (user) {
            setUserData({
                email: user.email || '',
                names: user.name || '',
                lastNames: user.lastName || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleUpdate = async () => {
        const response = await fetch(`/api/accounts/${user?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData), // Mandar los datos editados
        });

        const data = await response.json();
        if (data.success) {
            console.log("Cuenta actualizada correctamente");
        } else {
            console.error("Error al actualizar la cuenta:", data.error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="w-[90%] ml-[5%] mt-20">
                <div className="flex flex-wrap gap-5 pt-6 pb-5">
                    <div className="flex basis-[400px] grow justify-start bg-transparent rounded-md px-4 py-8">
                        <div className="flex flex-col w-full gap-3">

                            <div className="mb-5 flex flex-col gap-2">
                                <div>
                                    <TbDatabaseCog className="text-gray-600" size={55} />
                                </div>
                                <p className="font-extrabold text-3xl text-gray-500">Datos Personales</p>
                            </div>

                            <UpdateProfileForm
                                isLoading={false} // Usa un estado de carga si es necesario
                                setEmail={(email) => setUserData({ ...userData, email })}
                                setNames={(names) => setUserData({ ...userData, names })}
                                setLastNames={(lastNames) => setUserData({ ...userData, lastNames })}
                                setPhone={(phone) => setUserData({ ...userData, phone })}
                                handleUpdate={handleUpdate}
                                dataUser={user as Omit<AccountDto, 'password'>}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col basis-[400px] grow rounded-md">
                        <AddressForm />

                        <div className="mt-5 flex flex-col gap-3">
                            <div className="flex flex-row justify-between gap-2 p-2 border border-gray-200 hover:border-gray-300 rounded-md bg-gray-100 hover:bg-gray-300 cursor-pointer">
                                <div className="flex flex-row gap-2">
                                    <div className="grid place-content-center p-2 bg-gray-50 rounded-[50%] shadow-md">
                                        <TbMailbox />
                                    </div>
                                    <p className="grid place-content-center">Tus pedidos</p>
                                </div>

                                <div className="grid place-content-center">
                                    <PiArrowUpRightBold />
                                </div>
                            </div>

                            <div className="flex flex-row justify-between gap-2 p-2 border border-gray-200 hover:border-gray-300 rounded-md bg-gray-100 hover:bg-gray-300 cursor-pointer">
                                <div className="flex flex-row gap-2">
                                    <div className="grid place-content-center p-2 bg-gray-50 rounded-[50%] shadow-md">
                                        <GrTransaction />
                                    </div>
                                    <p className="grid place-content-center">Transacciones en la BlockChain</p>
                                </div>

                                <div className="grid place-content-center">
                                    <PiArrowUpRightBold />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
