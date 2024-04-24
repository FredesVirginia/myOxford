import { useEffect, useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { getColor } from "../../../helpers/getColor";



const ItemTypes = {
  IMAGE: "image",
};

interface Word {
  word: string;
}

interface WordsArray {
  words: Word[];
}

interface IRequestGET {
  img: {
    id: string;
    url: string;
  }[];
}

const INITIAL_DATA = {
  questionId: "912",
  words: [{ word: "Cake" }, { word: "Mobile" }, { word: "Apple" }, { word: "Jacket" }],
  img: [
    { id: "0", url: "../../../../public/img/apple.png" },
    { id: "1", url: "../../../../public/img/telefono.jpg" },
    { id: "2", url: "../../../../public/img/buzo.jpg" },
    { id: "3", url: "../../../../public/img/biscocho.jpg" },
  ],
};

const DraggableInput = ({ url, id }: { url: string; id: string }) => {
  const [{}, drag] = useDrag({
    type: ItemTypes.IMAGE, // Aquí establece el tipo de elemento como ItemTypes.INPUT
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const imgStyle = {
    borderRadius: "15px",
    border: "2px solid #00bcd4",
  };

  return (
    <img
      style={imgStyle}
      className="w-[120px] h-[120px] rounded-lg border-2 border-cyan-600"
      ref={drag}
      alt="img"
      src={url}
    />
  );
};




const DraggableDiv: React.FC<{ imgArray: IRequestGET }> = ({ imgArray }) => {
  return (
    <div className=" mb-3  bg-gray-300">
      {imgArray.img.map((img, index) => (
        <div className="w-[250px] h-[160px]   py-5 ">
          <DraggableInput key={index} id={img.id} url={img.url} />
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
  words: WordsArray;
  children: React.ReactNode;
}> = ({ requestGET, props, children }) => {
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
    accept: ItemTypes.IMAGE,
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
  console.log("jknkjbk 0909", requestGET.img[1].url);
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
          <DraggableInput key={itemId} url={requestGET.img[itemId].url} id={itemId.toString()} />
        </div>
      ))}

      {/* Renderizar palabras adicionales asociadas a los elementos soltados */}
      <div>{children}</div>
    </div>
  );
};

const DrangAImagePage = () => {
  const [droppedItems, setDroppedItems] = useState<{ idResponse: string; idContainer: number }[]>([]); // Estado para almacenar los elementos arrastrados//

  const [allItemsDropped, setAllItemsDropped] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);

  const [requestGET, setRequestGet] = useState<typeof INITIAL_DATA>(INITIAL_DATA);

  useEffect(() => {
    // Verificar si todos los elementos fueron arrastrados
    if (droppedItems.length === requestGET.img.length) {
      setAllItemsDropped(true);
    } else {
      setAllItemsDropped(false);
    }
  }, [droppedItems]);

  const handleDropItem = (idResponse: string, idContainer: number) => {
    setDroppedItems((prevItems) => [...prevItems, { idResponse, idContainer }]); // Añadimos un objeto con las claves idResponse e idContainer al array droppedItems
  };

  const [requestPOST, setRequestPOST] = useState<{
    questionId: string;
    response: { idResponse: string; idContainer: number }[];
  }>({
    questionId: requestGET.questionId,
    response: [],
  });

  // Obtener los elementos disponibles basados en los elementos arrastrados
  const getAvailableDraggableDivs = () => {
    const droppedDivs = droppedItems.map((item) => item.idResponse.toString());
    return requestGET.img.filter((img) => !droppedDivs.includes(img.id));
  };

  const firstAvailableDiv = getAvailableDraggableDivs();
  console.log("635484987465146498 =>", firstAvailableDiv);

  console.log("en DragAndDrop es ", droppedItems), console.log("la request POST ES ", requestPOST);

  const handleSave = () => {
    setNextDisabled(false);
    setRequestPOST({
      questionId: requestGET.questionId,
      response: droppedItems,
    });
  };

  const handleNext = () => {
    toast.success("Muy Bien");
  };

  const wordsObject: WordsArray = {
    words: requestGET.words,
  };

  console.log("La WORDOBJECT ES ", wordsObject);

  useEffect(() => {
    setRequestGet(INITIAL_DATA);
  }, []);

  return (
    <ActivityLayout
      saveProps={{
        className: `font-semibold py-4 w-[220px] text-center ${!allItemsDropped ? "bg-pink-300" : "bg-my-pink-500"}`,
        onClick: handleSave,
        disabled: !allItemsDropped,
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
      <div>
        <DndProvider backend={HTML5Backend}>
          <center className="flex justify-center items-center space-x-4">
            {requestGET.words.map((word, index) => (
              <DivContainer
                key={index}
                requestGET={requestGET}
                words={wordsObject}
                props={{
                  id: index + 1, // Podrías asignar un id único si lo necesitas
                  onDropItem: (idResponse: number, idContainer: number) =>
                    handleDropItem(idResponse.toString(), idContainer),
                }}
              >
                <p className="p-3 bg-cyan-100 text-cyan-900 mt-3 mb-3 font-semibold">{word.word}</p>
              </DivContainer>
            ))}
          </center>

          <center>
            <center className="flex justify-center items-center  mt-10  py-[14px] ">
              {getAvailableDraggableDivs().map((img, index) => (
                <DraggableDiv key={index} imgArray={{ img: [img] }} />
              ))}
            </center>
          </center>
        </DndProvider>
      </div>
    </ActivityLayout>
  );
};

export default DrangAImagePage;
