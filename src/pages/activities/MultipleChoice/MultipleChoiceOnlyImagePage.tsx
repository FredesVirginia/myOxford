import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";


const INITIAL_DATA = {
    questionId: "3223",
    imgs: [
        { id: "1", url: "../../../img/home.png" },
        { id: "2", url: "../../../img/biscocho.jpg" },
        { id: "3", url: "../../../img/naranja.jpg" },
        { id: "4", url: "../../../img/buzo.jpg" }
    ]
}





const MultipleChoiseOnlyImagePage = () => {

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const enviar2 = () => {


        const inputSeleccionado = document.querySelector('input[name="grupo1"]:checked');
        if (inputSeleccionado) {
            const idSeleccionado = inputSeleccionado.getAttribute('id');
            setSelectedOption(idSeleccionado);
        }

        console.log(" 1 Se seleccionó el input con id:", selectedOption);

        toast.success("Correcto");
        // Aquí puedes realizar cualquier otra acción con el id seleccionado

    };

    console.log(" 2 Se seleccionó el input con id:", selectedOption);
    return (
        <center>
            <div className="flex space-x-4 justify-center">
                {INITIAL_DATA.imgs.map((img, index) => (
                    <div key={index} >

                        <img src={img.url} className="w-[200px] mb-5 h-[190px] rounded-lg" />
                        <input type="radio" id={img.id} name="grupo1" className="w-10 h-10" />
                    </div>
                ))}
            </div>

            <Button onClick={enviar2} variant="contained" className='' endIcon={<SendIcon />}>
                Send
            </Button>
        </center>
    )

}

export default MultipleChoiseOnlyImagePage;