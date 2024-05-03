import { useState } from "react";
import "../../../App.css";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
const MapasNiveles = () => {

    const [rotation, setRotation] = useState(0);

    const rotateRight = () => {
        setRotation(prevRotation => prevRotation + 45);
    };

    const rotateLeft = () => {
        setRotation(prevRotation => prevRotation - 45);
    };
    return (
        <div className=" fondo  h-[825px] overflow-hidden flex justify-center">


           



            <div className="container bg-red-900 flex justify-center">
                <div className="image-container" style={{ transform: `rotate(${rotation}deg)` }}>
                    <img src="../../../img/Capa 1.png " alt="Imagen" className="w-[1000px]" />
                </div>

                <div className="image-container2" >
                    <img src="../../../img/homeTown.png" alt="Imagen" className="w-[340px]" />
                </div>

                <div className="  image-container3 buttons  flex justify-center space-x-[360px]">
                    <button  style={{padding: "0px 0px"}} onClick={rotateLeft}> <img src="../../../img/left.png" alt="Imagen" className="w-[160px]" /> </button>
                    <button style={{padding: "0px 0px"}} onClick={rotateRight}> <img src="../../../img/right.png" alt="Imagen" className="w-[160px]" /> </button>
                </div>
            </div>

        </div>
    )
}

export default MapasNiveles;