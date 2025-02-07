"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SignInForm: React.FC<{
  isLoading: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  setPassword: React.Dispatch<React.SetStateAction<string | null>>;
  handleIsLogin: () => void;
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isLoading, setEmail, setPassword, handleIsLogin, setIsSignin }) => (
  <section className="min-h-dvh dark:bg-gray-900 md:mt-0 mt-20">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
            Acceda a su cuenta
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                placeholder="name@company.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={handleIsLogin}
              className={`w-full ${isLoading ? "btn-disabled" : "btn-primary"} mb-5 mt-5 p-3 bg-gray-200 rounded-md`}
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Ingresar"}
            </button>
          </form>

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

          <div className="grid place-content-center mt-10 mb-5">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              ¿Aún no tienes cuenta?{" "}
              <span onClick={() => setIsSignin(false)} className="cursor-pointer font-medium text-blue-600 hover:underline">
                Regístrate
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SignInForm;

const AuthButton = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <button className="flex items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
    {icon}
    <span className="ml-2 text-neutral-700 dark:text-neutral-300 text-sm">{text}</span>
  </button>
);
