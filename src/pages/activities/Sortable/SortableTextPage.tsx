import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { toast } from "react-hot-toast";
import { getColor } from "../../../helpers/getColor";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const INITIAL_DATA = {
    questionId: "243",
    columnName: ["PROOER NOUS", "COMMON NOUS"],
    words: [
      { id: 0, word: "naranja lknlk " },
      { id: 1, word: "banana knkjn" },
      { id: 0, word: "casa kjnkj" },
      { id: 2, word: "edificio kjnkj" },
  
      { id: 0, word: "limon kjbkj" },
      { id: 2, word: "iglu jbkj" },
      { id: 1, word: "manzana bkjbkj" },
      { id: 1, word: "cabaña bjkbk" },
    ],
  };
  
  const SortableTextPage = () => {
    interface GridItem {
      id: number;
      word: string;
    }
  
    interface DragItem {
      type: string;
      id: number;
      index: number;
    }
  
    interface GridProps {
      grid: GridItem[];
      moveItem: (dragIndex: number, hoverIndex: number) => void;
      array: string[];
    }
  
    const GridItem: React.FC<{
      item: GridItem;
      index: number;
      moveItem: (dragIndex: number, hoverIndex: number) => void;
    }> = ({ item, index, moveItem }) => {
      const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
        type: "GRID_ITEM",
        item: { type: "GRID_ITEM", id: item.id, index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });
  
      const [, drop] = useDrop({
        accept: "GRID_ITEM",
        hover: (item: DragItem) => {
          const dragIndex = item.index;
          const hoverIndex = index;
          if (dragIndex === hoverIndex) {
            return;
          }
          moveItem(dragIndex, hoverIndex);
          item.index = hoverIndex;
        },
      });
  
      return (
        <div
          ref={(node) => drag(drop(node))}
          className=  " text-center p-2  rounded-2xl w-[200px] h-[40px] relative"
          style={{ opacity: isDragging ? 0.5 : 1, backgroundColor : getColor("my-sortable-clear") }}
        >
           <div className="text-center">
              {item.word}
          </div>
          {/* 
                          PARA MOSTRAR POR PANTALLA EL ID DE LO QUE SE ESTA ARRASTRANDO
                       <p className="mt-24 text-black font-bold text-3xl ">  {item.id} </p>
                       */}
        </div>
      );
    };
  
    const [requestGET, setRequestGet] = useState<typeof INITIAL_DATA>(INITIAL_DATA);
  
    const [grid, setGrid] = React.useState<GridItem[]>(requestGET.words);
  
    const moveItem = (dragIndex: number, hoverIndex: number) => {
      const dragItem = grid[dragIndex];
      const newGrid = [...grid];
      newGrid.splice(dragIndex, 1);
      newGrid.splice(hoverIndex, 0, dragItem);
      setGrid(newGrid);
    };
  
    let array = [];
    array = requestGET.columnName;
  
    //La variable allElementsArrays se inicializa
    //como una matriz vacía y luego se llena con submatrices de cadenas en un bucle
    const allElementsArrays: string[][] = [];
  
    //COMPONETE QUE RENDERIZA LAS IMAGENES
    const Grid: React.FC<GridProps> = ({ grid, moveItem, array }) => {
      const [columnImageIds, setColumnImageIds] = useState<string[][]>([]);
  
      useEffect(() => {
        const newColumnImageIds: string[][] = [];
        for (let i = 0; i < grid.length; i++) {
          newColumnImageIds[i] = [grid[i].id.toString()];
        }
        setColumnImageIds(newColumnImageIds);
      }, [grid]);
  
      useEffect(() => {
        if (grid.length % array.length === 0 && grid.length / array.length === array.length) {
          console.log("IDs de imágenes en cada columna:", columnImageIds);
          const flatArray = columnImageIds.flat();
          console.log("Array único de valores:", flatArray);
          //array segundo
          console.log("EL Array es ", array.length);
          // grid primero
          console.log("El grid es ", grid.length);
          const subArrays: string[][] = [];
          const chunkSize = Math.ceil(flatArray.length / array.length);
          console.log("LA DIVICION ES ", chunkSize);
  
          for (let i = 0; i < flatArray.length; i += chunkSize) {
            subArrays.push(flatArray.slice(i, i + chunkSize));
          }
  
          console.log("Subarrays:", subArrays);
  
          const maxLength = Math.max(...subArrays.map((subArray) => subArray.length));
  
          for (let i = 0; i < maxLength; i++) {
            const currentArray: string[] = [];
            subArrays.forEach((subArray) => {
              if (i < subArray.length) {
                currentArray.push(subArray[i]);
              }
            });
            allElementsArrays.push(currentArray);
          }
  
          console.log("Todos los elementos por posición: cfffd ", allElementsArrays);
        } else {
          console.log("IDs de imágenes en cada columna:", columnImageIds);
          const flatArray = columnImageIds.flat();
          console.log("Array único de valores:", flatArray);
          //array segundo
          console.log("EL Array es ", array.length);
          // grid primero
          console.log("El grid es ", grid.length);
          const subArrays: string[][] = [];
          const chunkSize = grid.length / 2;
          console.log("LA DIVICION ES ", chunkSize);
  
          for (let i = 0; i < flatArray.length; i += chunkSize) {
            subArrays.push(flatArray.slice(i, i + chunkSize));
          }
  
          console.log("Subarrays:", subArrays);
  
          const maxLength = Math.max(...subArrays.map((subArray) => subArray.length));
  
          for (let i = 0; i < maxLength; i++) {
            const currentArray: string[] = [];
            subArrays.forEach((subArray) => {
              if (i < subArray.length) {
                currentArray.push(subArray[i]);
              }
            });
            allElementsArrays.push(currentArray);
          }
  
          console.log("Todos los elementos por posición: cfffd ", allElementsArrays);
        }
      }, [columnImageIds, array]);
  
      return (
        <div className="">
          <div style={{ gridTemplateColumns: `repeat(${array.length}, 1fr)` }} className="grid gap-5  ">
            {" "}
            {/* Usar array.length aquí */}
            {grid.map((item, index) => (
              <div
                // Utiliza el resto de la división para seleccionar un color del arreglo
                className="px-6"
              >
                <div className="flex ">
                  {/* Aquí puedes agregar cualquier contenido específico de la columna */}
                  <GridItem item={item} index={index} moveItem={moveItem} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
  
    //LO QUE SE ENVIA AL BACK
  
    const [requestPOST, setRequestPost] = useState<{ questionId: string; responses: string[][] }>({
      questionId: requestGET.questionId,
      responses: [],
    });
  
    //ESTADO PARA MANEJAR LA HABILITACION DEL BOTON NEXT
    const [next, setNext] = useState(false);
    const handleSave = () => {
      setRequestPost({
        questionId: requestGET.questionId,
        responses: allElementsArrays,
      });
  
      setNext(true);
    };
  
    const handleNext = () => {
      toast.success(" ! Perfecto.. A por el Siguiente !");
    };
  
    console.log("EL REQUES POST ES ", requestPOST);
  
    useEffect(() => {
      setRequestGet(INITIAL_DATA);
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
        theme="sortable"
        acitivityHeader={{
          acitivity: "TOPIC NAME",
          quest: "GRAMMAR A1 LEVEL 2",
          description: "PART1: COMMON AND PROPER NOUNS",
          instruction: "Look at the picture choose the correct answer",
          info: "Drag the image into the correct column",
        }}
        primaryColor={getColor("my-green-sortable")}
      >
        <div>
          <div className="  mx-40 mb-20 p-5">
            <div className="flex justify-center items-center  ">
              <div className="mt-5  px-5">
                <DndProvider backend={HTML5Backend}>
                  <div className="flex space-x-5 justify-evenly  w-full my-3  ">
                    {array.map((item, index) => (
                      <div
                        key={index}
                        className="text-xl  text-black   px-10 py-1 border  "
                        
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <center>
                    <center className="flex  justify-center">
                      <Grid grid={grid} moveItem={moveItem} array={array} />
                    </center>
                  </center>
                </DndProvider>
              </div>
            </div>
          </div>
        </div>
      </ActivityLayout>
    );
  };

export default SortableTextPage;