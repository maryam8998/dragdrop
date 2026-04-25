import React from 'react';
import { useBuilderContext } from '../hooks/useBuilderContext';
import { DraggableComponent } from './DraggableComponent';

export const Preview = () => {
  const { state, setPreviewMode } = useBuilderContext();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full h-full max-w-4xl max-h-screen flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-dark">Preview</h2>
          <button
            onClick={() => setPreviewMode(false)}
            className="px-4 py-2 bg-gray-300 text-dark rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-light p-4">
          <div className="bg-white rounded-lg" style={{ position: 'relative', minHeight: '600px' }}>
            {state.components.map(component => (
              <DraggableComponent key={component.id} component={component} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};