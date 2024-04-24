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
    </DndProvider>
  )

}


export default DrangAWord;