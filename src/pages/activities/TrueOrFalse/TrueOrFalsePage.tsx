import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";

const INITIAL_DATA = {
  questionId: "kjbhiu",
  question: "How we feel?",
};

export const TrueOrFalsePage = () => {
  //LO QUE RECIBO DEL BACK

  const [responseGET, setResponseGER] = useState<typeof INITIAL_DATA>(INITIAL_DATA);

  //LO QUE ENVIO AL BACK
  const [responsePOST, setResponsePOST] = useState<{ questionId: string; responseValue?: boolean }>({
    questionId: "",
  });

  //ESTADO LOCAL PARA GUARDAR LAS RESPUESTAS
  const [responseInput, setResponseInput] = useState<boolean>();

  const [seleccionado, setSeleccionado] = useState<string>();
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const handleClick = (opcion: string, valor: boolean) => {
    setResponseInput(valor);
    setSeleccionado(opcion);
    setSaveDisabled(false); // Habilita el botón Save al seleccionar una opción
  };

  const handleSave = () => {
    setNextDisabled(false); // Habilita el botón Next al hacer clic en Save

    setResponsePOST((prevState) => ({
      ...prevState,
      questionId: responseGET.questionId,
      responseValue: responseInput,
    }));
  };

  const handleNext = () => {
    toast.success("Hecho");
  };

  useEffect(() => {
    send();
  }, [responsePOST]);

  useEffect(() => {
    setResponseGER(INITIAL_DATA);
  }, []);

  const send = () => {
    console.log("LA respuesta que se envia al Back es ", responsePOST);
  };

  return (
    <ActivityLayout
      saveProps={{
        className: "",
        onClick: handleSave,
        disabled: saveDisabled,
      }}
      nextProps={{
        className: "",
        disabled: nextDisabled,
        onClick: handleNext,
      }}
      theme="true-false"
      acitivityHeader={{
        acitivity: "True or False",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: "Look at the picture and choose the the correct awswer",
      }}
      primaryColor={getColor("my-pink-500")}
    >
      <div className="">
        <h2 className="text-center text-base mb-5 font-semibold text-my-purple-900">{responseGET.question}</h2>

        <center>
          <div
            className={`m-4 rounded-xl h[90px]  py-5 cursor-pointer border border-my-pink-500 ${
              seleccionado === "primero" ? "bg-my-pink-500 " : "bg-white"
            }`}
            onClick={() => handleClick("primero", true)}
          >
            <div className="flex items-center space-x-4">
              <div
                className={` rounded-xl font-semibold text-black px-5 py-4 border border-my-pink-500 ml-5 ${
                  seleccionado === "primero" ? "bg-pink-100" : "bg-white"
                }`}
              >
                1
              </div>
              <p className={`font-semibold ${seleccionado === "primero" ? "text-white" : "text-black"}`}>True</p>
            </div>
          </div>
          <div
            className={`m-4 rounded-xl h-[90px] py-5 cursor-pointer border border-my-pink-500 ${
              seleccionado === "segundo" ? "bg-my-pink-500 " : "bg-white"
            }`}
            onClick={() => handleClick("segundo", false)}
          >
            <div className="flex items-center space-x-4">
              <div
                className={` rounded-xl font-semibold text-black px-5 py-4 border border-my-pink-500 ml-5 ${
                  seleccionado === "segundo" ? "bg-pink-100" : "bg-white"
                }`}
              >
                2
              </div>
              <p className={`font-semibold ${seleccionado === "segundo" ? "text-white" : "text-black"}`}>False</p>
            </div>
          </div>
        </center>
      </div>
    </ActivityLayout>
  );
};
