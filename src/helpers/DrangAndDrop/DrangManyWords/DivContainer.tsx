import {  useState } from "react";

import { DraggableDiv } from "../../../helpers/DrangAndDrop/DrangManyWords/DraggableDiv";
import { DndProvider, useDrag, useDrop } from "react-dnd";

const ItemTypes = 'div';
type Word = {
    id: string;
    word: string;
};





type DivContainerProps = {
    words: string[];
    onDrop: (word: string) => void;

};


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


export const DivContainer: React.FC<DivContainerProps> = ({ words, onDrop }) => {

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


            <div style={{ backgroundColor: isOver ? 'lightblue' : 'transparent' }} className="bg-red-300">
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
