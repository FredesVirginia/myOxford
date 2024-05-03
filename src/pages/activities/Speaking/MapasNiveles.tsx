import { useState } from "react";
import "../../../App.css";


import { motion } from "framer-motion";
const MapasNiveles = () => {

    const [rotation, setRotation] = useState(0);

    const rotateRight = () => {
        setRotation(prevRotation => prevRotation + 45);
    };

    const rotateLeft = () => {
        setRotation(prevRotation => prevRotation - 45);
    };
    return (
        <div className="fondo" >
            <div className="flex  " >
                <div className="flex space-x-7 ml-20 mt-20">
                    <img src="../../../img/Frame 10251.png" alt="Imagen" className="w-[100px] h-[90px]" />
                    <img src="../../../img/Frame 10250.png" alt="Imagen" className="w-[100px] h-[90px]" />
                </div>
                <div className="ml-[500px]">
                    <img src="../../../img/Group.png " alt="Imagen" className=" w-[250px]" />
                </div>

                <div className="ml-[500px]">
                    <img src="../../../img/100.png " alt="Imagen" className=" mt-20 w-[200px]" />
                </div>

            </div>
            <div className="  h-[618px] overflow-hidden flex justify-center">

                <div className="container flex justify-center">


                    <div className="image-container" style={{ transform: `rotate(${rotation}deg)` }}>
                        <img src="../../../img/Capa 1.png " alt="Imagen" className="w-[1500px]" />
                    </div>

                    <div className="image-container2" >
                        <img src="../../../img/homeTown.png" alt="Imagen" className="w-[390px]" />
                    </div>

                    <div className="  image-container3 buttons  flex justify-center space-x-[500px]">
                        <button style={{ padding: "0px 0px" }} onClick={rotateLeft}> <img src="../../../img/left.png" alt="Imagen" className="w-[200px]" /> </button>
                        <button style={{ padding: "0px 0px" }} onClick={rotateRight}> <img src="../../../img/right.png" alt="Imagen" className="w-[200px]" /> </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MapasNiveles;