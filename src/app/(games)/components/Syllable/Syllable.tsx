import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface SyllableProps {
    syllable: string;
    index: number;
}

const Syllable: React.FC<SyllableProps> = ({ syllable, index }) => {
    return (
        <Draggable draggableId={`syllable-${index}`} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex items-center justify-center w-12 h-12 rounded-md m-1 cursor-move bg-gray-200`}
                >
                    {syllable}
                </div>
            )}
        </Draggable>
    );
};

export default Syllable;