"use client"

import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SigninForm";


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
                    <SignInForm
                        isLoading={isLoading}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        handleIsLogin={handleIsLogin}
                        setIsSignin={setIsSignin}
                    />
                </>
            ) : (
                <>
                    <SignUpForm
                        isLoading={isLoading}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setNames={setnames}
                        setLastNames={setLastNames}
                        setPhone={setPhone}
                        setAddressOfResidence={setAddressOfResidence}
                        setCountry={setCountry}
                        setCity={setCity}
                        cities={cities}
                        country={country}
                        callingCode={callingCode}
                        handleIsRegister={handleIsRegister}
                        setIsSignin={setIsSignin}
                        city={city}
                    />
                </>
            )}
        </>
    )
}

export default AuthComplete