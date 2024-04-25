import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend} from 'react-dnd-html5-backend';

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
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes,
    drop: (item: { id: string; word: string }, monitor) => {
      onDrop(item.word);
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
        padding: '20px',
        position: 'relative',
        margin: '10px',
        backgroundColor: isOver ? 'lightgreen' : 'transparent',
      }}
    >
      {words.map((word, index) => (
        <p key={index}>{word}</p>
      ))}
    </div>
  );
};

const DrangAWord: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<DroppedItems>({});

  const handleDrop = (word: string, containerId: number) => {
    setDroppedItems(prevState => ({
      ...prevState,
      [containerId]: word
    }));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <h1>hola</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {INITIAL_DATA.words.map((wordObj) => (
          <DraggableDiv key={wordObj.id} word={wordObj.word} id={wordObj.id} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {INITIAL_DATA.question.split('_').map((segment, index) => (
          <React.Fragment key={index}>
            <p>{segment}</p>
            {index !== INITIAL_DATA.question.split('_').length - 1 && (
              <DivContainer
                words={droppedItems[index] ? [droppedItems[index]] : []}
                onDrop={(word) => handleDrop(word, index)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </DndProvider>
  );
};

export default DrangAWord;
