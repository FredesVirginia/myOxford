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
        <div>
            <h1 className="text-center text-3xl"> Mapa de Niveles</h1>

            <div className="container">
                <div className="image-container" style={{ transform: `rotate(${rotation}deg)` }}>
                    <img src="../../../img/home.png" />

                </div>
                <div className="buttons">
                    <button onClick={rotateLeft}>Izquierda</button>
                    <button onClick={rotateRight}>Derecha</button>
                </div>
            </div>
        </div>
    )
}

export default MapasNiveles;