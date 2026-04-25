import React from 'react';
import { useBuilderContext } from '../hooks/useBuilderContext';
import { DraggableComponent } from './DraggableComponent';

export const Canvas = () => {
  const { state, deselectComponent } = useBuilderContext();

  return (
    <div
      className="canvas-container"
      onClick={() => deselectComponent()}
      style={{ position: 'relative', width: '100%', minHeight: '600px' }}
    >
      {state.components.map(component => (
        <DraggableComponent
          key={component.id}
          component={{
            ...component,
            ...(state.selectedComponentId === component.id && { selected: true }),
          }}
        />
      ))}
    </div>
  );
};