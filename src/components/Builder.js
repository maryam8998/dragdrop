import React from 'react';
import { useBuilderContext } from '../hooks/useBuilderContext';
import { Toolbar } from './Toolbar';
import { ComponentPanel } from './ComponentPanel';
import { Canvas } from './Canvas';
import { PropertyPanel } from './PropertyPanel';
import { Preview } from './Preview';

export const Builder = () => {
  const { state } = useBuilderContext();

  return (
    <div className="flex flex-col h-screen bg-light">
      <Toolbar />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar - Components */}
        <div className="w-full lg:w-64 border-r border-gray-200 overflow-y-auto">
          <ComponentPanel />
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-auto">
          <Canvas />
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-full lg:w-72 border-l border-gray-200 overflow-y-auto">
          <PropertyPanel />
        </div>
      </div>

      {/* Preview Modal */}
      {state.previewMode && <Preview />}
    </div>
  );
};