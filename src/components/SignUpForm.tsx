"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FaGithub, FaGoogle } from "react-icons/fa";

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
    handleIsRegister,
    setIsSignin,
}) => (
        <div className="flex justify-center items-center min-h-screen mt-28 mb-10">
            <div className="w-[90%] md:w-[50%] mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Bienvenido</h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Regístrate para acceder a la plataforma.
                </p>

                <form className="my-8" onSubmit={(e) => e.preventDefault()}>
                    <LabelInputContainer>
                        <Label htmlFor="names">Nombres</Label>
                        <Input id="names" className="text-base" placeholder="" type="text" onChange={(e) => setNames(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastNames">Apellidos</Label>
                        <Input id="lastNames" className="text-base" placeholder="" type="text" onChange={(e) => setLastNames(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" className="text-base" placeholder="" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="email">Numero celular</Label>
                        <Input id="email" className="text-base" placeholder="" type="tel" onChange={(e) => setPhone(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" className="text-base" placeholder="" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </LabelInputContainer>
                    <button
                        type="button"
                        onClick={handleIsRegister}
                        className={`w-full ${isLoading ? "btn-disabled" : "btn-primary"} mb-5 mt-5 p-3 bg-gray-200 rounded-md`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Registrando..." : "Registrarse"}
                    </button>

                    <div>
                        <div>
                            <div className="flex items-center my-4">
                                <div className="flex-1 h-px bg-gray-400"></div>
                                <span className="px-3 text-sm text-neutral-600">También puedes usar</span>
                                <div className="flex-1 h-px bg-gray-400"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-5 justify-between mt-6">
                        <AuthButton icon={<FaGithub />} text="GitHub" />
                        <AuthButton icon={<FaGoogle />} text="Google" />
                    </div>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
                        ¿Ya tienes cuenta?
                        <button
                            className="text-blue-600 dark:text-blue-400 ml-1 hover:underline"
                            onClick={() => setIsSignin(true)}
                        >
                            Inicia sesión aquí
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );

const AuthButton = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <button className="flex items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
        {icon}
        <span className="ml-2 text-neutral-700 dark:text-neutral-300 text-sm">{text}</span>
    </button>
);

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col space-y-2 w-full mb-4">{children}</div>
);

export default SignUpForm;