import React, { useRef, useEffect, useState } from 'react';
import { PiCoinsFill } from 'react-icons/pi';
import { TbCaretUpFilled, TbCoins, TbRocket } from 'react-icons/tb';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface StatusMessage {
    title: string;
    text: string;
    type: 'not-for-sale' | 'for-sale' | 'has-bid';
}

const CoinStatus = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    const [messages] = useState<StatusMessage[]>([
        {
            title: "Gana Más con Cada Compra",
            text: "Tus compras en ParfumCol valen más de lo que imaginas. Cada vez que adquieres una fragancia, obtienes ParfumCoins, que puedes usar para obtener descuentos, productos exclusivos y recompensas especiales. ¡Mientras más compras, más ganas!",
            type: "not-for-sale"
        },
        {
            title: "Haz Crecer el Valor de tus ParfumCoins",
            text: "Tus ParfumCoins pueden aumentar su valor si las conservas. Al guardarlas, ayudas a que la moneda se fortalezca, lo que significa que podrás obtener más beneficios en el futuro. ¡Deja que su valor suba mientras tú disfrutas tus perfumes!",
            type: "for-sale"
        },
        {
            title: "Construye un Futuro de Recompensas",
            text: "Cada ParfumCoin que ganas impulsa un ecosistema donde todos ganan. Al usarlas dentro de ParfumCol, accedes a promociones únicas y contribuyes al crecimiento de una comunidad de amantes de las fragancias. ¡Tus monedas son la llave a un mundo de aromas y beneficios sostenibles!",
            type: "has-bid"
        }
    ]);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = null;

        // Ajustamos la cámara para mantener la vista actual
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.set(0, 4, 5);
        camera.lookAt(0, -1, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);

        mountRef.current.appendChild(renderer.domElement);

        // Iluminación
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(2, 4, 2);
        scene.add(directionalLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
        fillLight.position.set(-2, 4, 2);
        scene.add(fillLight);

        // Controles
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minPolarAngle = Math.PI / 3;
        controls.maxPolarAngle = Math.PI / 3;

        const loader = new GLTFLoader();
        loader.load(
            '/models/base.glb',
            (gltf) => {
                const model = gltf.scene;

                // Centrar el modelo
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);

                // Ajustamos la posición vertical del modelo más abajo
                model.position.y = -2.5; // Aumentamos el valor negativo para bajar más el modelo

                // Ajustar escala
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3.5 / maxDim;
                model.scale.multiplyScalar(scale);

                // Rotación inicial
                model.rotation.x = -Math.PI / 6;
                model.rotation.y = 0;
                model.rotation.z = 0;

                scene.add(model);
                setModelLoaded(true);

                const animate = () => {
                    requestAnimationFrame(animate);
                    controls.update();
                    renderer.render(scene, camera);
                };
                animate();
            },
            (progress) => {
                const percentage = (progress.loaded / progress.total * 100);
                console.log('Loading progress: ', percentage + '%');
            },
            (error) => {
                console.error('Error loading model:', error);
                setLoadingError('Error loading 3D model. Please check if the file path is correct and the file format is .glb');
            }
        );

        const handleResize = () => {
            if (mountRef.current) {
                const width = mountRef.current.clientWidth;
                const height = mountRef.current.clientHeight;

                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.domElement.style.width = `${width}px`;
                renderer.domElement.style.height = `${height}px`;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="w-[90%] ml-[5%] mr-[5%] mt-20">
            <div className="flex flex-wrap gap-6">
                <div className="flex flex-col basis-[400px] grow space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-lg bg-transparent space-y-2"
                        >
                            <div>
                                {message.type === 'not-for-sale' && (
                                    <PiCoinsFill size={35} className='text-yellow-500 drop-shadow-md' />
                                )}
                                {message.type === 'for-sale' && (
                                    <TbCaretUpFilled size={35} className='text-green-500 drop-shadow-md' />
                                )}
                                {message.type === 'has-bid' && (
                                    <TbRocket size={35} className='text-blue-500 drop-shadow-md' />
                                )}
                            </div>
                            <h1 className='text-black font-extrabold'>{message.title}</h1>
                            <p className="text-gray-800 font-light text-sm">{message.text}</p>
                        </div>
                    ))}
                </div>
                <div
                    ref={mountRef}
                    className="rounded-lg basis-[400px] grow grid place-content-center h-[300px] sm:h-[400px] md:h-[500px] max-w-full overflow-hidden"
                >
                    {loadingError && (
                        <div className="text-red-500 text-center p-4">
                            {loadingError}
                        </div>
                    )}
                    {!modelLoaded && !loadingError && (
                        <div className="text-white text-center p-4">
                            Loading model...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoinStatus;