import { useState } from "react";
import "../../../App.css";
const MapasNiveles = () => {

    const [rotation, setRotation] = useState(0);

    const rotateRight = () => {
        setRotation(prevRotation => prevRotation + 45);
    };

    const rotateLeft = () => {
        setRotation(prevRotation => prevRotation - 45);
    };
    return (
        <div className="bg-red-300 h-[825px] overflow-hidden flex justify-center">


           



            <div className="container bg-red-900">
                <div className="image-container" style={{ transform: `rotate(${rotation}deg)` }}>
                    <img src="../../../img/Capa 1.png " alt="Imagen" className="w-[1000px]" />
                </div>
                <div className="buttons  flex justify-center">
                    <button onClick={rotateLeft}>Izquierda</button>
                    <button onClick={rotateRight}>Derecha</button>
                </div>
            </div>

        </div>
    )
}

export default MapasNiveles;