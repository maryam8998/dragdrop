import React from 'react';
import { useBuilderContext } from '../hooks/useBuilderContext';
import { componentTypes } from '../utils/componentUtils';

export const PropertyPanel = () => {
  const { state, updateComponent, removeComponent } = useBuilderContext();
  const selectedComponent = state.components.find(
    c => c.id === state.selectedComponentId
  );

  if (!selectedComponent) {
    return (
      <div className="bg-white border-l border-gray-200 p-4 w-full lg:w-72 flex items-center justify-center">
        <p className="text-gray-500 text-center">Select a component to edit properties</p>
      </div>
    );
  }

  const handlePropertyChange = (key, value) => {
    updateComponent(selectedComponent.id, {
      properties: {
        ...selectedComponent.properties,
        [key]: value,
      },
    });
  };

  const handleDimensionChange = (key, value) => {
    updateComponent(selectedComponent.id, {
      [key]: Math.max(0, parseInt(value) || 0),
    });
  };

  return (
    <div className="bg-white border-l border-gray-200 p-4 w-full lg:w-72 overflow-y-auto max-h-96 lg:max-h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-dark">Properties</h2>
        <button
          onClick={() => removeComponent(selectedComponent.id)}
          className="px-2 py-1 bg-danger text-white rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      <div className="space-y-4">
        {/* Dimensions */}
        <div>
          <label className="block text-sm font-medium text-dark mb-2">Position & Size</label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={selectedComponent.x}
                onChange={(e) => handleDimensionChange('x', e.target.value)}
                placeholder="X"
                className="property-input w-1/2 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                value={selectedComponent.y}
                onChange={(e) => handleDimensionChange('y', e.target.value)}
                placeholder="Y"
                className="property-input w-1/2 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={selectedComponent.width}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
                placeholder="Width"
                className="property-input w-1/2 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                value={selectedComponent.height}
                onChange={(e) => handleDimensionChange('height', e.target.value)}
                placeholder="Height"
                className="property-input w-1/2 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Text Components */}
        {(selectedComponent.type === componentTypes.TEXT ||
          selectedComponent.type === componentTypes.HEADING) && (
          <>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Text</label>
              <input
                type="text"
                value={selectedComponent.properties.text}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
                className="property-input w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Font Size</label>
              <input
                type="number"
                value={selectedComponent.properties.fontSize}
                onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value))}
                className="property-input w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Color</label>
              <input
                type="color"
                value={selectedComponent.properties.color}
                onChange={(e) => handlePropertyChange('color', e.target.value)}
                className="property-input w-full h-10 border border-gray-300 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Alignment</label>
              <select
                value={selectedComponent.properties.alignment || 'left'}
                onChange={(e) => handlePropertyChange('alignment', e.target.value)}
                className="property-input w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        )}

        {/* Button Properties */}
        {selectedComponent.type === componentTypes.BUTTON && (
          <>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Button Text</label>
              <input
                type="text"
                value={selectedComponent.properties.text}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
                className="property-input w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Background Color</label>
              <input
                type="color"
                value={selectedComponent.properties.backgroundColor}
                onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
                className="property-input w-full h-10 border border-gray-300 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Text Color</label>
              <input
                type="color"
                value={selectedComponent.properties.textColor}
                onChange={(e) => handlePropertyChange('textColor', e.target.value)}
                className="property-input w-full h-10 border border-gray-300 rounded cursor-pointer"
              />
            </div>
          </>
        )}

        {/* Image Properties */}
        {selectedComponent.type === componentTypes.IMAGE && (
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Image URL</label>
            <input
              type="url"
              value={selectedComponent.properties.src}
              onChange={(e) => handlePropertyChange('src', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="property-input w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Input Properties */}
        {selectedComponent.type === componentTypes.INPUT && (
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Placeholder</label>
            <input
              type="text"
              value={selectedComponent.properties.placeholder}
              onChange={(e) => handlePropertyChange('placeholder', e.target.value)}
              className="property-input w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};