import React from 'react';
import { useBuilderContext } from '../hooks/useBuilderContext';
import { createComponent, componentTypes } from '../utils/componentUtils';

export const ComponentPanel = () => {
  const { addComponent } = useBuilderContext();

  const components = [
    { type: componentTypes.TEXT, label: 'Text', icon: '📝' },
    { type: componentTypes.HEADING, label: 'Heading', icon: '🔤' },
    { type: componentTypes.BUTTON, label: 'Button', icon: '🔘' },
    { type: componentTypes.IMAGE, label: 'Image', icon: '🖼️' },
    { type: componentTypes.INPUT, label: 'Input', icon: '📋' },
    { type: componentTypes.CONTAINER, label: 'Container', icon: '📦' },
  ];

  const handleAddComponent = (type) => {
    const newComponent = createComponent(type);
    addComponent(newComponent);
  };

  return (
    <div className="bg-white border-r border-gray-200 p-4 w-full lg:w-64 overflow-y-auto max-h-96 lg:max-h-full">
      <h2 className="text-lg font-bold text-dark mb-4">Components</h2>
      <div className="space-y-2">
        {components.map(comp => (
          <button
            key={comp.type}
            onClick={() => handleAddComponent(comp.type)}
            className="component-item w-full flex items-center gap-3 p-3 bg-light hover:bg-gray-100 rounded-lg border border-gray-200 transition-all"
          >
            <span className="text-2xl">{comp.icon}</span>
            <span className="font-medium text-dark">{comp.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};