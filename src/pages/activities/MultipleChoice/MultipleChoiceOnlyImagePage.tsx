import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";


const INITIAL_DATA = {
    questionId: "3223",
    intruction : "This is my red apple" ,
     imgs: [
        { id: "1", url: "../../../img/home.png" },
        { id: "2", url: "../../../img/biscocho.jpg" },
        { id: "3", url: "../../../img/naranja.jpg" },
        { id: "4", url: "../../../img/buzo.jpg" }
    ]
}





const MultipleChoiseOnlyImagePage = () => {
    const [nextDisabled, setNextDisabled] = useState(true);
    const [selectedOption, setSelectedOption] = useState<string >("");
    const [requestPOST , setRequestPOST] = useState<{
        questionId : string,
        response : string
    }>();
    const handleSave = () => {

        setNextDisabled(false);
        const inputSeleccionado = document.querySelector('input[name="grupo1"]:checked');
        if (inputSeleccionado !== null) {
            const idSeleccionado = inputSeleccionado.getAttribute('id');
            if (idSeleccionado !== null) {
                setSelectedOption(idSeleccionado);
                
            }
        }


        toast.success("Correcto");
        // Aquí puedes realizar cualquier otra acción con el id seleccionado

    };

   


    useEffect(()=>{
        setRequestPOST({
            questionId:INITIAL_DATA.questionId ,
            response : selectedOption
        })

    } , [selectedOption])
    const handleNext = () => {
        toast.success("Muy Bien");
        console.log("EL reques POST ES " , requestPOST);
      };

    console.log(" 2 Se seleccionó el input con id:", selectedOption);
    return (
        <ActivityLayout
        saveProps={{
            className: `font-semibold py-4 w-[220px] text-center "}`,
            onClick: handleSave,
            
          }}
          nextProps={{
            className: `font-semibold py-4 w-[220px] text-center ${nextDisabled ? "bg-pink-300" : "bg-my-pink-500"}`,
            disabled: nextDisabled,
            onClick: handleNext,
          }}
        theme="multiple-choice"
        acitivityHeader={{
          acitivity: "Multiple Choice",
          quest: "GRAMAR A1 LEVEL 2",
          description: "PART1: COMMON AND PROPER NOUNS",
          instruction: "Select the best option matching with the sentence",
        }}
        primaryColor={getColor("my-blue-500")}
      >
        <center>
            <h1 className="text-center text-2xl text-purple-800 font-bold mb-10" > {INITIAL_DATA.intruction}</h1>
            <div className="flex space-x-4 justify-center">
                {INITIAL_DATA.imgs.map((img, index) => (
                    <div style={{borderRadius:"20px"}} key={index} className="p-5 rounded-lg border border-gray-600" >

                        <img src={img.url} className="w-[200px] mb-5 h-[190px] rounded-lg" />
                        <input type="radio" id={img.id} name="grupo1" className="w-10 h-10 " />
                    </div>
                ))}
            </div>

         
        </center>



      </ActivityLayout>
    )

}

export default MultipleChoiseOnlyImagePage;