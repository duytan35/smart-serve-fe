import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Step {
  id: number;
  name: string;
}

const DraggableSteps = ({
  steps,
  setSteps,
}: {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>; // Type for setSteps
}) => {
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedSteps = Array.from(steps);
    const [removed] = reorderedSteps.splice(source.index, 1);
    reorderedSteps.splice(destination.index, 0, removed);

    setSteps(reorderedSteps); // Update steps in parent component
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="steps">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              padding: '10px',
              backgroundColor: '#f9f9f9',
              minHeight: '100px',
            }}
          >
            {steps?.map((step, index) => (
              <Draggable
                key={step.id}
                draggableId={step.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: 'none',
                      padding: '10px',
                      margin: '0 0 8px 0',
                      backgroundColor: '#fff',
                      ...provided.draggableProps.style,
                    }}
                  >
                    {step.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableSteps;
