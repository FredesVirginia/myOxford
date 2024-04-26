import { useEffect, useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { getColor } from "../../../helpers/getColor";
import React from "react";

type Word = {
    id: string;
    word: string;
};

type DivContainerProps = {
    words: string[];
    onDrop: (word: string) => void;
};


type DroppedItems = {
    [key: number]: string;
};

const ItemTypes = 'div';

const INITIAL_DATA = {
    questionId: "913",
    question: "kneirubiureon knoin_knio koi oinoi noie_onjoioi kno er_",
    words: [
        { id: "1", word: "primero" },
        { id: "2", word: "segundo" },
        { id: "3", word: "tercero" },
    ] as Word[]
};

const DraggableDiv: React.FC<{ word: string; id: string }> = ({ word, id }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes,
        item: { id, word },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.8)',


                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                margin: '5px',
                display: 'inline-block',

            }}
            className="rounded-xl font-bold  text-xl py-1 px-2"
        >
            {word}
        </div>
    );
};

const DivContainer: React.FC<DivContainerProps> = ({ words, onDrop }) => {

    const [droppedItems, setDroppedItems] = useState<number[]>([]);
    const [hasDropped, setHasDropped] = useState<boolean>(false);

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes,
        drop: (item: { id: string; word: string }, monitor) => {
            if (!hasDropped) {
                onDrop(item.id);
                //ESTATO PARA ALMACENAR CUANTOS DIVDRANGLE SE VA A RENDERIZAR DENTRO DE CADA DIVCONTAINER
                setDroppedItems((prevItems) => [...prevItems, parseInt(item.id)]);
                //ESTADO PARA VERIFICAR QUE SOLO SE SUELTE UN SOLO ELEMENTOS EN CADA DIVCONTAINER
                setHasDropped(true);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const containerBorderStyle = droppedItems.length === 0 ? '2px solid gray  ' : 'none';
    return (
        <div
            ref={drop}
            style={{
                width: droppedItems.length === 0 ? "150px" : "auto",
                height: droppedItems.length === 0 ? "50px" : "auto",
                border: containerBorderStyle,

                position: 'relative',
                margin: '10px',
                backgroundColor: isOver ? 'lightblue' : 'transparent',

            }}
            className="rounded-xl "
        >


            <div style={{ backgroundColor: isOver ? 'lightblue' : 'transparent' }}>
                {droppedItems.map((itemId, index) => {
                    const wordObj = INITIAL_DATA.words.find(word => word.id == itemId.toString());
                    if (wordObj) {
                        return (
                            <div className="flex justify-center items-center" key={index}>
                                <DraggableDiv key={index} word={wordObj.word} id={itemId.toString()} />
                            </div>
                        );
                    } else {
                        return null; // O puedes manejar este caso de alguna otra manera
                    }
                })}
            </div>
        </div>
    );
};





const DrangAWordPage = () => {
    // Estado para almacenar los elementos soltados junto con su contenedor
    const [droppedItems, setDroppedItems] = useState<{ idWord: string; indContainer: number }[]>([]);

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


    const handleSave = () => {
        setNextDisabled(false);
        setRequestPOST({
            questionId: INITIAL_DATA.questionId,
            response: droppedItems,
        });
    };

    const handleDrop = (wordId: string, containerId: number) => {
        // Actualiza el estado para agregar el elemento soltado junto con su contenedor
        setDroppedItems(prevState => [
            ...prevState,
            { idWord: wordId, indContainer: containerId }
        ]);
    };

    //FUNCION PARA NOS VOLVER A MOSTRAR ELEMENTOS QUE YA SE SOLTARON

    const getAvailableDraggableDivs = () => {
        const droppedDivs = droppedItems.map((item) => item.idWord.toString());
        return INITIAL_DATA.words.filter((img) => !droppedDivs.includes(img.id));
    };


    console.log("EL ARRAY ES ", droppedItems);
    return (
        <ActivityLayout
            saveProps={{
                // className: `font-semibold py-4 w-[220px] text-center ${!allItemsDropped ? "bg-pink-300" : "bg-my-pink-500"}`,
                //onClick: handleSave,
                //disabled: !allItemsDropped,
            }}
            nextProps={{
                // className: `font-semibold py-4 w-[220px] text-center ${nextDisabled ? "bg-pink-300" : "bg-my-pink-500"}`,
                // disabled: nextDisabled,
                //onClick: handleNext,
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


                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }} className="flex justify-center border border-gray rounded-xl" >
                    {INITIAL_DATA.question.split('_').map((segment, index) => (
                        <div className="flex items-center" key={index}>
                            <p className=" text-black text-2xl">{segment}</p>
                            {index !== INITIAL_DATA.question.split('_').length - 1 && (
                                <DivContainer
                                    words={droppedItems.filter(item => item.indContainer === index).map(item => item.idWord)}
                                    onDrop={(wordId) => handleDrop(wordId, index)}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <center>
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

export default DrangAWordPage;