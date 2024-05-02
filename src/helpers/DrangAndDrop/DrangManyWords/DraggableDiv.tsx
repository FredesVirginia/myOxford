import { DndProvider, useDrag, useDrop } from "react-dnd";

const ItemTypes = 'div';

export const DraggableDiv: React.FC<{ word: string; id: string }> = ({ word, id }) => {
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