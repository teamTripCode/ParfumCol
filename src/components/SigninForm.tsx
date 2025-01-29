"use client"

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
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Correo Electrónico
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="input"
                />
              </div>
              <button
                type="button"
                onClick={handleIsLogin}
                className={`w-full ${isLoading ? "btn-disabled" : "btn-primary"}`}
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Ingresar"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Aún no tienes cuenta?{" "}
                <span onClick={() => setIsSignin(false)} className="cursor-pointer font-medium text-blue-600 hover:underline">
                  Regístrate
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  export default SignInForm;