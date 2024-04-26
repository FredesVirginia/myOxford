import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  question: "kneirubiure_knionoie_onjoioier_",
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
        padding: '10px',
        backgroundColor: 'lightblue',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        margin: '5px'
      }}
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

  return (
    <div
      ref={drop}
      style={{
        width: '300px',
        border: '2px dashed black',
      
        position: 'relative',
        margin: '10px',
        backgroundColor: isOver ? 'lightgreen' : 'transparent',
      }}
    >


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
  );
};

const DrangAWord: React.FC = () => {
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
    <DndProvider backend={HTML5Backend}>
      <h1>hola</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>


        {getAvailableDraggableDivs().map((wordObj) => (
          <DraggableDiv key={wordObj.id} word={wordObj.word} id={wordObj.id} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {INITIAL_DATA.question.split('_').map((segment, index) => (
          <React.Fragment key={index}>
            <p>{segment}</p>
            {index !== INITIAL_DATA.question.split('_').length - 1 && (
              <DivContainer
                words={droppedItems.filter(item => item.indContainer === index).map(item => item.idWord)}
                onDrop={(wordId) => handleDrop(wordId, index)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </DndProvider>
  );
};

export default DrangAWord;
