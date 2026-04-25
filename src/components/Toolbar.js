import React from 'react';
import { useBuilderContext } from '../hooks/useBuilderContext';
import { downloadHTML } from '../utils/componentUtils';

export const Toolbar = () => {
  const { state, setPreviewMode, clearAll } = useBuilderContext();

  const handleDownload = () => {
    downloadHTML(state.components, 'my-website.html');
  };

  const handlePreview = () => {
    setPreviewMode(true);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all components?')) {
      clearAll();
    }
  };

  return (
    <div className="bg-dark text-white p-4 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
      <h1 className="text-2xl font-bold">Website Builder</h1>
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <button
          onClick={handlePreview}
          className="px-4 py-2 bg-primary hover:bg-blue-700 rounded font-medium transition-all"
        >
          Preview
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-secondary hover:bg-green-600 rounded font-medium transition-all"
        >
          Export HTML
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-danger hover:bg-red-600 rounded font-medium transition-all"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};