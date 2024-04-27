import { SetStateAction, useState } from "react";
import { getColor } from "../../../helpers/getColor";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import toast from "react-hot-toast";



const INITIAL_DATA = {
    "questionId": "ewe",
    "img": { url: "../../../img/home.png" },
    "intruncion": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis laudantium itaque vitae accusamus nostrum culpa. Est fuga arc ",
    "options": [
        { id: "1", option: "primero" },
        { id: "2", option: "segundo" },
        { id: "3", option: "tercero" },
    ]
}



const MultipleChoiseImageVisualPage = () => {
    const [selectedOption, setSelectedOption] = useState<string>("0");
    const [nextDisabled, setNextDisabled] = useState(true);
    const [requestPOST , setRequestPOST] = useState<{
        questionId : string,
        response : string
    }>();

    const handleOptionChange = (optionId: string , opcion : string) => {
        setSelectedOption(optionId);
        console.log("La opcion selecionada es " ,opcion )
    };

    const getOptionLabel = (index: number) => {
        return String.fromCharCode(97 + index) + ') ';
      };

    const handleSave = () =>{
        setNextDisabled(false);
        setRequestPOST(
            {
                questionId : INITIAL_DATA.questionId,
                response : selectedOption
            }
        )
    }

    const handleNext = () => {
        toast.success("Muy Bien");
      };

    console.log("LA REQUEST POST ES " , requestPOST);


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
        <div>
            <h1 className="text-center text-2xl">Hola Multiple Chois Imag Visual</h1>

           <center>
           <div className="flex justify-center space-x-4  ">
                <div className="flex space-x-24">
                    <div className="p-8 border border-gray-400 rounded-2xl">
                        <img  alt="img" src={INITIAL_DATA.img.url} className="rounded-2xl w-[200px]" />
                    </div>

                    <div className="flex flex-col space-y-12">
                        <h2 className="text-left p-3 text-xl font-extrabold w-[900px] pr-60 py-4 rounded-xl" style={{backgroundColor : getColor("my-blue-pri") , color : getColor("my-blue-900")}}> {INITIAL_DATA.intruncion}</h2>
                        <div className="space-y-2 flex flex-col justify-left flex-start">
                            {INITIAL_DATA.options.map((option , index)  => (
                                <div
                                    key={option.id}
                                    style={{color: getColor("my-blue-900") , borderRadius: "30px"}}
                                    className= {`flex  rounded-2xl  text-2xl font-bold  w-[300px] px-4 py-2  cursor-pointer ${selectedOption === option.id ? 'bg-blue-500 text-white' : 'bg-blue-300 '
                                        }`}
                                    onClick={() => handleOptionChange(option.id , option.option)}
                                >
                                    <span> {getOptionLabel(index)} {option.option}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
           </center>
        </div>


      </ActivityLayout>
    )

}

export default MultipleChoiseImageVisualPage;