import { RefObject, useEffect, useRef, useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { DraggableDiv } from "../../../helpers/DrangAndDrop/DrangManyWords/DraggableDiv";
import { DivContainer } from "../../../helpers/DrangAndDrop/DrangManyWords/DivContainer";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { getColor } from "../../../helpers/getColor";
import React from "react";




interface Answer {
    response_id: number;
    sentence: string;
}

interface QuestionData {
    question_id: string;
    answers: Answer[];
}

interface ResponseObject {
    idWord: string;
    indContainer: number;
    text?: string;
}

const INITIAL_DATA = {
    questionId: "913",

    arrayQuestion: [
        { p: " 1ededre _ ijni _" },
        { p: " 2ededre _  nini kjkjbk  _ jbkjb _ " },



    ],

    array2: [
        { id: 0, "text": " 1ededre _ ijni _" },
        { id: 1, "text": " 2ededre _  nini kjkjbk  _ jbkjb _ " },

    ],
    words: [
        { id: "1", word: "primero" },
        { id: "2", word: "segundo" },
        { id: "3", word: "tercero" },
        { id: "4", word: "cuarto" },
        { id: "5", word: "quinto" },

    ] as Word[]
};

type GroupedArrayItem = {
    idWord: string;
    indContainer: number;
    text: string;
};

const DrangManyWordsPage = () => {
    // Estado para almacenar los elementos soltados junto con su contenedor
    const [droppedItems, setDroppedItems] = useState<{ idWord: string; indContainer: number, text: string }[]>([]);

    //ESTADO PARA MANEJAR EL BOTON DE NEXT HABILITADO / DESABILITADO
    const [nextDisabled, setNextDisabled] = useState(true);
    //ESTADO DONDE SE GUARDA LA INFORMACION PARA ENVIAR AL SERVIDOR
    const [requestPOST, setRequestPOST] = useState<{
        questionId: string;
        response: { idWord: string; indContainer: number }[];
    }>({
        questionId: INITIAL_DATA.questionId,
        response: [],
    });


    const [questionData, setQuestionData] = useState<QuestionData>({
        question_id: "",
        answers: []
    });


    const handleSave = () => {
        setNextDisabled(false);
        setRequestPOST({
            questionId: INITIAL_DATA.questionId,
            response: droppedItems
        });



    };

    const handleDrop = (wordId: string, containerId: number, text: string) => {
        // Actualiza el estado para agregar el elemento soltado junto con su contenedor



        // Aquí puedes realizar otras operaciones con el contador si lo necesitas

        // Incrementar el contador

        setDroppedItems(prevState => [
            ...prevState,
            { idWord: wordId, indContainer: containerId, text: text }
        ]);


    };

    //FUNCION PARA NOS VOLVER A MOSTRAR ELEMENTOS QUE YA SE SOLTARON

    const getAvailableDraggableDivs = () => {
        const droppedDivs = droppedItems.map((item) => item.idWord.toString());
        return INITIAL_DATA.words.filter((img) => !droppedDivs.includes(img.id));
    };

    const groupedArrays: Record<number, ResponseObject[]> = {};

    const handleNext = () => {
        requestPOST.response.forEach(obj => {
            const { indContainer, idWord } = obj;
            if (!groupedArrays[indContainer]) {
                groupedArrays[indContainer] = [];
            }
            // Buscar el valor correspondiente de word en INITIAL_DATA.words
            const wordObj = INITIAL_DATA.words.find(word => word.id === idWord);
            if (wordObj) {
                // Reemplazar idWord con el valor de word
                obj.idWord = wordObj.word;
            }
            groupedArrays[indContainer].push(obj);
        });

        // Convertir el objeto en un array de arrays
        const resultArrays = Object.values(groupedArrays);

        console.log('Arrays agrupados por indContainer con palabras:', resultArrays);
        console.log("El  REQUESPOST ES  ", requestPOST);

        const idWordsOnly: string[][] = Object.values(groupedArrays).map(arr =>
            arr.map(({ idWord }) => idWord)
        );
        console.log("ES ", idWordsOnly);



        function replaceUnderscores(text: string, idWords: string[]): string {
            let index = 0;
            return text.replace(/_/g, () => idWords[index++]);
        }

        // Generar las nuevas cadenas de texto
        const newTexts: string[] = INITIAL_DATA.array2.map(({ text }, index) => {
            const idWords = idWordsOnly[index];
            return replaceUnderscores(text, idWords);
        });

        console.log("LAS CADENAS SON ", newTexts);


        const assignResponseIds = (texts: string[]): Answer[] => {
            const newAnswers: Answer[] = [];

            texts.forEach((text, index) => {
                const sentence = text.trim(); // Eliminar espacios en blanco al principio y al final
                const response_id = index + 1; // Obtener el próximo response_id disponible
                newAnswers.push({ response_id, sentence });
            });

            return newAnswers;
        };

        // Asignar response_id a las nuevas respuestas
        const newAnswers: Answer[] = assignResponseIds(newTexts);

        // Actualizar el estado questionData con las nuevas respuestas
        setQuestionData({
            question_id: "f71e2299-b9c8-4235-ab7e-e73ee85c0e7a",
            answers: newAnswers
        });
    }


    console.log("loque SE ENVIE ES ", questionData)



    return (
        <ActivityLayout
            saveProps={{
                className: `font-semibold py-4 w-[220px] text-center `,
                onClick: handleSave,

            }}
            nextProps={{
                className: `font-semibold py-4 w-[220px] text-center ${nextDisabled ? "bg-pink-300" : "bg-my-pink-500"}`,
                disabled: nextDisabled,
                onClick: handleNext,
            }}
            theme="drang-and-drop"
            acitivityHeader={{
                acitivity: "TOPIC NAME ",
                quest: "A1 GRAMMAR , Quest 2",
                description: "Tak 1: Drang and Drop",
                instruction: "Drang the word to the correct place",
                info: "Drag the image to the blank spaces",
            }}
            primaryColor={getColor("my-blue-200")}
        >


            <DndProvider backend={HTML5Backend}>


                <div className="border border-gray-800 rounded-xl p-4">
                    {INITIAL_DATA.array2.map((item, containerIndex) => (
                        <div key={containerIndex} className="">
                            {item.text.split('_').map((text, textIndex) => (
                                <React.Fragment key={textIndex}>
                                    <div style={{ display: 'inline-block', marginTop: "18px" }} className="text-2xl  ">
                                        {text}
                                    </div>
                                    {textIndex !== item.text.split('_').length - 1 && (
                                        <div style={{ display: 'inline-block', verticalAlign: 'top' }} className="">
                                            <DivContainer

                                                words={droppedItems.filter(item => item.indContainer === textIndex).map(item => item.idWord)}
                                                onDrop={(wordId) => handleDrop(wordId, item.id, item.text)}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
                <center className="flex justify-center mt-10">
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>


                        {getAvailableDraggableDivs().map((wordObj) => (
                            <DraggableDiv key={wordObj.id} word={wordObj.word} id={wordObj.id} />
                        ))}
                    </div>
                </center>
            </DndProvider>

        </ActivityLayout>
    )

}

export default DrangManyWordsPage;