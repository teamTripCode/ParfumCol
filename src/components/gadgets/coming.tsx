import NavBar from "@/components/NavBar";
import Image from "next/image";
import blockchainIcon from "@/assets/blockchain.png"

function ComingSoon() {
    return (
        <>
            <NavBar />
            <div className="min-h-dvh grid place-content-center w-[90%] ml-[5%]">
                <div>
                    <div className="grid place-content-center mb-4">
                        <div className="flex flex-row gap-1 bg-gray-300 rounded-full px-5 py-2">
                            <div className="grid place-content-center">
                                <Image src={blockchainIcon} alt={"block"} width={15} height={15} className="drop-shadow-lg" />
                            </div>
                            <p className="grid place-content-center text-sm font-thin drop-shadow-lg">TripChain</p>
                        </div>
                    </div>
                    <div className="space-y-2 mt-3">
                        <h1 className="sm:text-3xl md:text-4xl font-semibold text-gray-700 text-2xl text-center">Próximamente Disponible</h1>
                        <p className="text-center font-thin">La nueva era de la tecnología blockchain se está elaborando con precisión y cuidado.</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ComingSoon;