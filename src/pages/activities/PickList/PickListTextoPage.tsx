import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";

interface IItem {
  text: string;
  array: string[];
}

const INITIAL_DATA: { questionId: string; texts: IItem[] } = {
  questionId: "231",
  texts: [
    { text: "knoino vfdfvrvr vfdvfv ", array: ["first", "second", "four"] },
    { text: "knoino fverve dce ", array: ["i", "you", "we"] },
    { text: "knoino dfcerved", array: ["first", "second", "four"] },
    { text: "knoino  vfdvfv ", array: ["i", "you", "we"] },
    { text: "knoino fverve dsdeferre  dce ", array: ["first", "second", "four"] },
    { text: "knoino dceee dfcerved scsd dcwecwe", array: ["i", "you", "we"] },
  ],
};

const PickListTextoPage = () => {
  const [requestGET, setRequestGET] = useState<typeof INITIAL_DATA>(INITIAL_DATA);

  const [next, setNext] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState<{ [key: string]: number }>();

  const handleSeleccionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectId: string = event.target.id;
    const opcionSeleccionada = event.target.value;
    const item = requestGET.texts[parseInt(selectId)];
    const opcionIndex = item.array.findIndex((option) => option === opcionSeleccionada);
    setOpcionesSeleccionadas({ ...opcionesSeleccionadas, [selectId]: opcionIndex });
    if (opcionesSeleccionadas) {
      const allSelectedValues = requestGET.texts.every(
        (item: IItem, idx: number) => item.array[opcionesSeleccionadas[idx]] !== undefined
      );
      setAllSelected(allSelectedValues);
    }
  };

  const handleSave = () => {
    console.log("All selected:", allSelected);
    console.log("Opciones seleccionadas:", opcionesSeleccionadas);
    toast.success("Muy Bien");
    setNext(true);
  };

  const handleNext = () => {
    toast.success("Perfecto");
  };

  useEffect(() => {
    setRequestGET(INITIAL_DATA);
  }, []);

  return (
    <ActivityLayout
      saveProps={{
        className: `font-semibold py-4 w-[220px] text-center `,

        onClick: handleSave,
      }}
      nextProps={{
        className: `font-semibold py-4 w-[220px] text-center ${!next ? "bg-pink-300" : "bg-my-pink-500"}`,
        disabled: !next,
        onClick: handleNext,
      }}
      theme="pick-list"
      acitivityHeader={{
        acitivity: "TOPIC NAME",
        quest: "A1 GRAMAR , Quest 2",
        description: "Task 1 : Pick List",
        instruction: "Select the best option matching with the sentences",
        info: "Read the sentences and click and click on the arrow to see the options",
      }}
      primaryColor={getColor("my-pick-list-primary")}
    >
      <center>
        <h1 className="text-center font-bold" style={{ color: getColor("my-pick-list-primary") }}>
          {" "}
          Choose the correct answer that match word with the sentence
        </h1>
        <center
          className="flex flex-wrap w-[1046px] border "
          style={{ borderRadius: "10px", borderColor: getColor("my-pick-list-primary") }}
        >
          {requestGET.texts.map((item, index) => (
            <div key={index} className="pl-8 py-3 flex justify-center">
              <p className="text-black mt-[2px] text-xl mr-2">{item.text}</p>
              {item.array && item.array.length > 0 && (
                <select
                  id={index.toString()}
                  className="text-bold border-2 border-slate-200 rounded-md p-2"
                  style={{ borderColor: "#4B5563" }}
                  onChange={(e) => handleSeleccionChange(e)}
                >
                  <option className="text-xl font-semibold text-black" disabled selected>
                    Choose your option
                  </option>
                  {item.array.map((option, idx) => (
                    <option className="text-xl font-semibold" key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </center>
      </center>
    </ActivityLayout>
  );
};

export default PickListTextoPage;
