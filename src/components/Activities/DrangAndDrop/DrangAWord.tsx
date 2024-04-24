import { useEffect, useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { getColor } from "../../../helpers/getColor";
import React from "react";



const INITIAL_DATA = {
  questionId: "913",
  question: " kneirubiure_knionoie_onjoioier_ ",
  words: [
    { id: "0", word: "primero" },
    { id: "1", word: "segundo" },
    { id: "2", word: "tercero" },

  ]
}


interface DraggableDivProps {

  id: string;
  word: string
}

interface IRequestGET {

  id: string;
  word: string;

}

const ItemTypes = 'div';

// Componente de un div arrastrable
const DraggableDiv: React.FC<IRequestGET> = ({ id, word }) => {

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
       
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      className="text-white bg-orange-300 p-2 px-10"
    >
      {word}
    </div>
  );
};



const DivContainer: React.FC<IRequestGET> = ({ id , word}) => {
  const [droppedItem, setDroppedItem] = useState<string>();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes,
    drop: (item: any) => {
      if (item.id === id) {
        console.log(`Soltaste el div con ID ${id}`);
        setDroppedItem(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      style={{
        width: '300px',
        height: '200px',
        border: '2px dashed black',
        padding: '20px',
        position: 'relative',
      }}
    >
      {isActive ? 'Suelta aquí' : 'Arrastra aquí'}
      {droppedItem === id && <DraggableDiv word={word} id={id} />} {/* Renderizamos el div arrastrable si se soltó en este contenedor */}
    </div>
  );
};


const DrangAWord = () => {

  const [requestGET, setRequestGet] = useState<typeof INITIAL_DATA>(INITIAL_DATA)

  let questionParts = requestGET.question.split("_");





  return (
    <DndProvider backend={HTML5Backend}>


     <center className="flex justify-center mt-10">
     <center>
        <div className="flex space-x-5">
          {requestGET.words.map((index, elemt) => (

            <DraggableDiv key={index.id} id={index.toString()} word={index.word} >

            </DraggableDiv>

          ))}
        </div>
      </center>

     
     </center>

     <div className="flex justify-center mt-20 space-x-5">
      {questionParts.map((part, index) => (
          <React.Fragment key={index}>
            {/* Renderizar el texto de la parte */}
            <p className="mr-2">{part}</p>
            {/* Renderizar un div para el separador "_" */}
            {index !== questionParts.length - 1 && (
               <DivContainer id={index.toString()} word={part} />
            )}
          </React.Fragment>
        ))}
      </div>
    </DndProvider>
  )

}


export default DrangAWord;