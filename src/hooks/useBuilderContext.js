import { useContext } from 'react';
import { BuilderContext } from '../context/BuilderContext';

export const useBuilderContext = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilderContext must be used within BuilderProvider');
  }
  return context;
};