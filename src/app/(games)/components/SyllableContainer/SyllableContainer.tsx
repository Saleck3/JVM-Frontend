import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Syllable from '../Syllable/Syllable';

interface SyllableContainerProps {
    syllables: string[];
}

const SyllableContainer: React.FC<SyllableContainerProps> = ({ syllables }) => {
    return (
        <div className="flex items-center justify-center h-20">
            <Droppable droppableId="syllable-container" direction="horizontal">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex justify-center space-x-1"
                    >
                        {syllables.map((syllable, index) => (
                            <Syllable key={`${index}`} syllable={syllable} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default SyllableContainer;