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
        <div className="bg-red-300 h-[790px] overflow-hidden flex justify-center">


           



            <div className="container bg-red-900">
                <div className="image-container" style={{ transform: `rotate(${rotation}deg)` }}>
                    <img src="../../../img/home.png " alt="Imagen" />
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