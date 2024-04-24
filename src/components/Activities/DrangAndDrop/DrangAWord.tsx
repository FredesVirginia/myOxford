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
        {id : "0" , word: "primero"} , 
        {id : "1" , word: "segundo"} , 
        {id : "2" , word: "tercero"} , 

    ]
}

const ItemTypes = {
    DIV: "div",
  };

  interface IRequestGET {
    words: {
      id: string;
      word: string;
    }[];
  }

  interface Word {
    word: string;
  }
  
  interface WordsArray {
    words: Word[];
  }



const DraggableInput = ({ word, id }: { word: string; id: string }) => {
    const [{}, drag] = useDrag({
      type: ItemTypes.DIV, // Aquí establece el tipo de elemento como ItemTypes.INPUT
      item: { id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
   return (
        <div  className="p-4 bg-red-400">
            {word}
        </div>
    );
  };


  const DraggableDiv: React.FC<{ wordArray: IRequestGET }> = ({ wordArray }) => {
    return (
      <div className=" mb-3  bg-gray-300">
        {wordArray.words.map((elemt, index) => (
          <div className="w-[250px] h-[160px]   py-5 ">
            <DraggableInput key={index} id={elemt.id} word={elemt.word} />
          </div>
        ))}
      </div>
    );
  };

  type DivContainerProps = {
    id: number;
    onDropItem: (idResponse: number, idContainer: number) => void;
  };


  const DivContainer: React.FC<{
    requestGET: IRequestGET;
    props: DivContainerProps;
   
    
  }> = ({ requestGET, props }) => {
    //   const [droppedItem, setDroppedItem] = useState<number | null>(null);
    const [droppedItems, setDroppedItems] = useState<number[]>([]);
    const [hasDropped, setHasDropped] = useState<boolean>(false);
    //   const [data, setData] = useState<{}[]>([]);
  
    //   useEffect(() => {
    //     // Restablecer droppedItem cuando se monta el componente
    //     setDroppedItem(null);
  
    //     setData([]);
    //   }, []);
  
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: ItemTypes.DIV,
      drop: (item: any) => {
        if (!hasDropped) {
          setDroppedItems((prevItems) => [...prevItems, item.id]);
          setHasDropped(true);
  
          console.log("EL item es ", item.id);
          console.log("EL item es value ", item);
          console.log(`Soltaste el div con ID ${props.id}`);
          // setData((prevData) => [...prevData, item.id]); // Añadimos el id del elemento arrastrado al array data
          // setDroppedItem(props.id);
  
          // props.onDropItem(item.id, props.id)
          props.onDropItem(item.id, props.id);
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
          width: "140px",
          height: "210px",
          paddingBottom: "90px",
          border: "2px solid",
          borderRadius: "10px",
          borderColor: getColor("border-drop"),
  
          color: "white",
        }}
      >
        {isActive ? "Suelta aquí" : "Arrastra aquí"}
        {/* Renderizamos el div arrastrable si se soltó en este contenedor */}
        {droppedItems.map((itemId, index) => (
          <div className="flex justify-center items-center " key={index}>
            <DraggableInput key={itemId} word={requestGET.words[itemId].id} id={itemId.toString()} />
          </div>
        ))}
  
        {/* Renderizar palabras adicionales asociadas a los elementos soltados */}
    
      </div>
    );
  };
 





const DrangAWord = () => {

    const [requestGET, setRequestGet] = useState<typeof INITIAL_DATA>(INITIAL_DATA)

    let questionParts = requestGET.question.split("_");

    const [droppedItems, setDroppedItems] = useState<{ idResponse: string; idContainer: number }[]>([]); // Estado para almacenar los elementos arrastrados//

    const [allItemsDropped, setAllItemsDropped] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(true);
  
  
    useEffect(() => {
      // Verificar si todos los elementos fueron arrastrados
      if (droppedItems.length === requestGET.words.length) {
        setAllItemsDropped(true);
      } else {
        setAllItemsDropped(false);
      }
    }, [droppedItems]);
  
    const handleDropItem = (idResponse: string, idContainer: number) => {
      setDroppedItems((prevItems) => [...prevItems, { idResponse, idContainer }]); // Añadimos un objeto con las claves idResponse e idContainer al array droppedItems
    };

     // Obtener los elementos disponibles basados en los elementos arrastrados
  const getAvailableDraggableDivs = () => {
    const droppedDivs = droppedItems.map((item) => item.idResponse.toString());
    return requestGET.words.filter((elemt) => !droppedDivs.includes(elemt.id));
  };
  
    return (
        <DndProvider backend={HTML5Backend}>
            <center className="mt-4 flex justify-center">
                {/* Renderizar la pregunta */}
                <div className="flex">
                    {questionParts.map((part, index) => (
                        <React.Fragment key={index}>
                            {/* Renderizar el texto de la parte */}
                            <p className="mr-2">{part}</p>
                            {/* Renderizar un div para el separador "_" */}
                            {index !== questionParts.length - 1 && (
                                 <DivContainer
                                 key={index}
                                 requestGET={requestGET}
                                 
                                 props={{
                                   id: index + 1, // Podrías asignar un id único si lo necesitas
                                   onDropItem: (idResponse: number, idContainer: number) =>
                                     handleDropItem(idResponse.toString(), idContainer),
                                 }}
                               >
                                 
                               </DivContainer>
                            )}
                        </React.Fragment>
                    ))}
                </div>


              
            </center>

            <center>
            <center className="flex justify-center items-center space-x-5 mt-10  py-[14px] ">
              {getAvailableDraggableDivs().map((elemt, index) => (
                <DraggableDiv key={index} wordArray= {{ words: [elemt] }}  />
              ))}
            </center>
          </center>
        </DndProvider>
    )

}


export default DrangAWord;