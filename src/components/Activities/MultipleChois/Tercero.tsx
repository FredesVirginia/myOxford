import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";

const Tercero: React.FC = () => {
  //   const [pressedButtons, setPressedButtons] = useState([]);

  //   const handleOptionClick = (value1: string, value2: string) => {
  //     // Eliminamos cualquier entrada existente que tenga el mismo conjunto de botones
  //     const filteredButtons = pressedButtons.filter((btn) => btn.value2 !== value2);
  //     // Agregamos el nuevo botón clickeado
  //     setPressedButtons([...filteredButtons, { value1, value2 }]);
  //   };

  //   const enviar = () => {
  //     console.log(pressedButtons);
  //     const areEqual = pressedButtons.every((item) => item.value1 === item.value2);
  //     if (areEqual) {
  //       toast.success("Correcto");
  //     } else {
  //       toast.error("Revisa tu Respuetas");
  //     }
  //     setPressedButtons([]);
  //   };

  //   const isSendButtonDisabled = () => {
  //     // Obtenemos los valores únicos de value2 de los botones presionados
  //     const uniqueValues = Array.from(new Set(pressedButtons.map((btn) => btn.value2)));
  //     // Si hay al menos un valor por cada conjunto de botones, el botón de enviar está habilitado
  //     return uniqueValues.length < 3;
  //   };

  const enviar2 = () => {
    const idD = "radio1";
    const inputSeleccionado = document.querySelector('input[name="grupo1"]:checked');
    if (inputSeleccionado && inputSeleccionado.id === idD) {
      const idSeleccionado = inputSeleccionado.id;
      console.log("Se seleccionó el input con id:", idSeleccionado);

      toast.success("Correcto");
      // Aquí puedes realizar cualquier otra acción con el id seleccionado
    } else {
      toast.error("Incorrecta");
    }
  };

  return (
    <div>
      <div className="mt-20 bg-white mx-40 py-20">
        <h2 className="text-center text-xl"> Respuesta Unicamente con Imagen</h2>
        <h3 className="text-center"> Choose the Correct picture</h3>

        <div className="flex space-x-5 py-10 items-center justify-center">
          <div className="relative">
            <input type="radio" id="radio0" name="grupo1" className="absolute top-3 left-3 z-10 w-5 h-5 " />
            <img src="../img/home.png" alt="casa" className="w-[200px] mb-5 h-[190px] rounded-lg" />
          </div>

          <div className="relative">
            <input type="radio" id="radio1" name="grupo1" className="absolute top-3 left-3 z-10 w-5 h-5 " />
            <img src="../img/apple.png" alt="casa" className="w-[200px] mb-5 h-[190px] rounded-lg" />
          </div>

          <div className="relative">
            <input type="radio" id="radio2" name="grupo1" className="absolute top-3 left-3 z-10 w-5 h-5 " />
            <img src="../img/home.png" alt="casa" className="w-[200px] mb-5 h-[190px] rounded-lg" />
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <Button onClick={enviar2} variant="contained" className="" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tercero;
