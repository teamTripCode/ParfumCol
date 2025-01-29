"use client"

import Select from "react-select";

const SignUpForm: React.FC<{
    isLoading: boolean;
    setEmail: React.Dispatch<React.SetStateAction<string | null>>;
    setPassword: React.Dispatch<React.SetStateAction<string | null>>;
    setNames: React.Dispatch<React.SetStateAction<string | null>>;
    setLastNames: React.Dispatch<React.SetStateAction<string | null>>;
    setPhone: React.Dispatch<React.SetStateAction<string | null>>;
    setAddressOfResidence: React.Dispatch<React.SetStateAction<string | null>>;
    setCountry: React.Dispatch<React.SetStateAction<{ label: string; value: string } | null>>;
    setCity: React.Dispatch<React.SetStateAction<{ label: string; value: string } | null>>;
    cities: { label: string; value: string }[];
    country: { label: string; value: string } | null;
    callingCode: string;
    handleIsRegister: () => void;
    setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
    city: { label: string; value: string } | null;
}> = ({
    isLoading,
    setEmail,
    setPassword,
    setNames,
    setLastNames,
    setPhone,
    setAddressOfResidence,
    setCountry,
    setCity,
    cities,
    country,
    callingCode,
    handleIsRegister,
    setIsSignin,
    city,
}) => (
        <section className="min-h-dvh dark:bg-gray-900 md:mt-20 mt-20">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
                            Crea una cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label htmlFor="names" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nombres
                                </label>
                                <input
                                    type="text"
                                    id="names"
                                    onChange={(e) => setNames(e.target.value)}
                                    className="input"
                                    placeholder="Ej. Juan"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastNames" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Apellidos
                                </label>
                                <input
                                    type="text"
                                    id="lastNames"
                                    onChange={(e) => setLastNames(e.target.value)}
                                    className="input"
                                    placeholder="Ej. Pérez"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="input"
                                    placeholder="Ej. 123456789"
                                />
                            </div>
                            <div>
                                <label htmlFor="addressOfResidence" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Dirección de Residencia
                                </label>
                                <input
                                    type="text"
                                    id="addressOfResidence"
                                    onChange={(e) => setAddressOfResidence(e.target.value)}
                                    className="input"
                                    placeholder="Ej. Calle 123 #45-67"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">País</label>
                                <Select
                                    options={[
                                        { label: "Colombia", value: "Colombia" },
                                        { label: "México", value: "México" },
                                        // Agrega más opciones aquí
                                    ]}
                                    value={country}
                                    onChange={(selected) => setCountry(selected)}
                                    placeholder="Seleccione un país"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ciudad</label>
                                <Select
                                    options={cities}
                                    value={city}
                                    onChange={(selected) => setCity(selected)}
                                    placeholder="Seleccione una ciudad"
                                    isDisabled={!country} // Deshabilitado hasta que se seleccione un país
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Código de país: {callingCode}
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleIsRegister}
                                className={`w-full ${isLoading ? "btn-disabled" : "btn-primary"}`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Registrando..." : "Registrarse"}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Ya tienes una cuenta?{" "}
                                <span
                                    onClick={() => setIsSignin(true)}
                                    className="cursor-pointer font-medium text-blue-600 hover:underline"
                                >
                                    Inicia sesión
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

export default SignUpForm;