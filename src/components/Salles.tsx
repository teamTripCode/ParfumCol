import NFTCarousel from "./ui/NFTCarousel"

function Sellers() {
    return (
        <>
            <div className="mt-20 mb-20 flex flex-col">
                <div className="w-[90%] ml-[5%]">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl text-start font-semibold">Mayores Ventas</h3>
                            <p className="text-[11px]">Actualizado hace 20 segundos</p>
                        </div>
                        <div>
                            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Ver todo</button>
                        </div>
                    </div>
                    <NFTCarousel />
                </div>

                <div className="w-[90%] ml-[5%] mt-16">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl text-start font-semibold">Ordenes recientes</h3>
                            <p className="text-[11px]">Actualizado hace 20 segundos</p>
                        </div>
                        <div className="">
                            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-sm">Ver todo</button>
                        </div>
                    </div>
                    <NFTCarousel />
                </div>
            </div>
        </>
    )
}

export default Sellers