import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";
const OpenSelectWordPage = () => {
  const [next, setNext] = useState(false);
  const [save, setSave] = useState(false);
  const [text, setText] = useState("");

  const handleSave = () => {
    toast.success("Muy Bien");
    setNext(true);
  };

  const handleNext = () => {
    toast.success("Perfecto");
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!event) return;
    setText(event.target.value);
    setSave(true);
    if (text.length > 0) {
      setSave(true);
    } else {
      setSave(false);
    }
  };

  // EFFECTOS
  return (
    <ActivityLayout
      saveProps={{
        className: `font-semibold py-4 w-[220px] text-center `,
        disabled: !save,
        onClick: handleSave,
      }}
      nextProps={{
        className: `font-semibold py-4 w-[220px] text-center ${!next ? "bg-pink-300" : "bg-my-pink-500"}`,
        disabled: !next,
        onClick: handleNext,
      }}
      theme="open"
      acitivityHeader={{
        acitivity: "TOPIC NAME",
        quest: "A1 GRAMMAR ,  Quest 2",
        description: "Task1:Open",
        instruction: "Write about your dream vacation. Write a minimum of 20 words",
        info: " Write in the empty box",
      }}
      primaryColor={getColor("my-open-rose")}
    >
      <center>
        <h1 className="text-center text-xl font-bold" style={{ color: getColor("my-purple-900") }}>
          {" "}
          It"s time to write
        </h1>

        <textarea
          onChange={handleChange}
          className="border rounded-xl pt-28 px-8 text-black w-[900px] h-[250px]"
          style={{ borderColor: getColor("my-open-rose") }}
        ></textarea>
      </center>
    </ActivityLayout>
  );
};

export default OpenSelectWordPage;
