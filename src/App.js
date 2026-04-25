import React from 'react';
import { BuilderProvider } from './context/BuilderContext';
import { Builder } from './components/Builder';
import './index.css';

function App() {
  return (
    <BuilderProvider>
      <Builder />
    </BuilderProvider>
  );
}

export default App;