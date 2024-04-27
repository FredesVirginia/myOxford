import toast from "react-hot-toast";
import { getColor } from "../../../helpers/getColor";
import { ChangeEvent, useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";


const INITIALDATA = {
    questionId: "e323",
    intruction: " How are You",
    img: { id: "1", url: "../../../img/home.png" }
}

const OpenImagePage = () => {

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
                <center>
                    <div className="flex justify-center space-x-20">
                        <div className="pt-16"> <img className="h-[300px] rounded-xl" src={INITIALDATA.img.url} /></div>
                        <div>
                            <h2 className="text-2xl font-bold  mb-9" style={{ color: getColor("my-blue-900") }}> {INITIALDATA.intruction}</h2>
                            <textarea className="border rounded-xl py-10 px-8 text-black w-[900px] h-[300px]"
                                style={{ borderColor: getColor("my-open-rose") }}>

                            </textarea>
                        </div>
                    </div>
                </center>
            </center>

        </ActivityLayout>
    )
}

export default OpenImagePage;