"use client"

import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import Select from "react-select";


function AuthComplete() {
    const [isSignin, setIsSignin] = useState<boolean>(true);
    const { register, login } = useAuth()

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [names, setnames] = useState<string | null>(null);
    const [lastNames, setLastNames] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [addressOfResidence, setAddressOfResidence] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [country, setCountry] = useState<{ label: string; value: string } | null>(null);
    const [city, setCity] = useState<{ label: string; value: string } | null>(null);
    const [callingCode, setCallingCode] = useState<string>("");

    const [cities, setCities] = useState<{ label: string; value: string }[]>([]);

    // Fetch countries from Rest Countries API
    useEffect(() => {
        if (country) {
            fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ country: country.value }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === false) {
                        setCities(
                            data.data.map((city: string) => ({
                                label: city,
                                value: city,
                            }))
                        );
                    } else {
                        toast.error("No se pudieron cargar las ciudades");
                    }
                })
                .catch(() => toast.error("Error al cargar las ciudades"));
        }
    }, [country]);

    // Fetch country calling code from Rest Countries API
    useEffect(() => {
        if (country) {
            fetch(`https://restcountries.com/v3.1/name/${country.value}`)
                .then((response) => response.json())
                .then((data) => {
                    const code = data[0]?.idd?.root + (data[0]?.idd?.suffixes?.[0] || "");
                    setCallingCode(code || "");
                })
                .catch(() => toast.error("No se pudo obtener el código de país"));
        }
    }, [country]);

    const handleIsLogin = async () => {
        try {
            setIsLoading(true)
            console.log(email, password)
            await login(email as string, password as string);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleIsRegister = async () => {
        try {
            setIsLoading(true)
            // console.log(email, password, names, lastNames, addressOfResidence, phone, country?.value, city?.value, callingCode)
            await register({
                email: email as string,
                password: password as string,
                name: names as string,
                lastName: lastNames as string,
                country: country?.value as string,
                city: city?.value as string,
                code_country: callingCode as string,
                home_address: addressOfResidence as string,
                phone: phone as string
            })
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <NavBar />
            {isSignin ? (
                <>
                    <section className="min-h-dvh  dark:bg-gray-900 md:mt-0 mt-20">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
                                        Acceda a su cuenta
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico</label>
                                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>

                                        <p className="text-start cursor-pointer text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</p>

                                        <button
                                            type="button"
                                            className={`w-full text-white ${isLoading
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
                                                } focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
                                            onClick={handleIsLogin}
                                            disabled={isLoading} // Desactiva el botón mientras carga
                                        >
                                            {isLoading ? "Cargando..." : "Ingresar"}
                                        </button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            ¿Aún no tiene cuenta? <span onClick={() => setIsSignin(false)} className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Registrate</span>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <section className="min-h-dvh  dark:bg-gray-900 md:mt-64 mt-20">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mb-0 md:mb-44">
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
                                        Crea una cuenta
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres</label>
                                            <input onChange={(e) => setnames(e.target.value)} type="text" name="password" id="password" placeholder="David" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>

                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                                            <input onChange={(e) => setLastNames(e.target.value)} type="text" name="password" id="password" placeholder="Vasquez Mahecha" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electronico</label>
                                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                        </div>

                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="country"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                País
                                            </label>
                                            <Select
                                                id="country"
                                                options={[
                                                    { label: "Colombia", value: "Colombia" },
                                                ]}
                                                onChange={(selected) => setCountry(selected)}
                                                placeholder="Seleccione su país"
                                            />
                                        </div>

                                        {/* City Select */}
                                        <div>
                                            <label
                                                htmlFor="city"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Ciudad
                                            </label>
                                            <Select
                                                id="city"
                                                options={cities}
                                                onChange={(selected) => setCity(selected)}
                                                placeholder="Seleccione su ciudad"
                                                isDisabled={!country}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="flex gap-2">
                                            <div className="w-1/4">
                                                <label
                                                    htmlFor="callingCode"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Código
                                                </label>
                                                <input
                                                    id="callingCode"
                                                    type="text"
                                                    value={callingCode}
                                                    readOnly
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                />
                                            </div>
                                            <div className="w-3/4">
                                                <label
                                                    htmlFor="phone"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Número de Celular
                                                </label>
                                                <input
                                                    id="phone"
                                                    type="text"
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="Ingrese su número"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Other Fields */}
                                        <div>
                                            <label
                                                htmlFor="address"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Dirección de Residencia
                                            </label>
                                            <input
                                                onChange={(e) => setAddressOfResidence(e.target.value)}
                                                type="text"
                                                id="address"
                                                placeholder="Ingrese su dirección"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                            />
                                        </div>

                                        <button onClick={handleIsRegister} type="button" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Registrarse</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Ya tienes una cuenta? <span onClick={() => setIsSignin(true)} className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500" >Ingresa</span>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default AuthComplete