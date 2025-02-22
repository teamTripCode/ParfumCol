import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface DevelopmentBannerProps {
    onClose: () => void;
}

export default function DevelopmentBanner({ onClose }: DevelopmentBannerProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!visible) {
            onClose(); // Notifica al padre que el banner se cerró
        }
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-blue-50 text-black text-center p-2 font-semibold flex items-center justify-between z-50 px-4 md:px-6">
            <span className="text-xs font-light text-center md:text-sm text-gray-500">
                🚧 Este sitio web está en fase de desarrollo. Es posible que algunas funciones no funcionen como se espera.
            </span>
            <button
                className="text-black hover:text-gray-700"
                onClick={() => setVisible(false)}
            >
                <X size={20} />
            </button>
        </div>
    );
}
