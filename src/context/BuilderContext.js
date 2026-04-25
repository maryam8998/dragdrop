import React, { createContext, useReducer, useCallback } from 'react';

export const BuilderContext = createContext();

const initialState = {
  components: [],
  selectedComponentId: null,
  previewMode: false,
};

const builderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMPONENT':
      return {
        ...state,
        components: [...state.components, action.payload],
        selectedComponentId: action.payload.id,
      };

    case 'REMOVE_COMPONENT':
      return {
        ...state,
        components: state.components.filter(c => c.id !== action.payload),
        selectedComponentId: null,
      };

    case 'UPDATE_COMPONENT':
      return {
        ...state,
        components: state.components.map(c =>
          c.id === action.payload.id
            ? { ...c, ...action.payload.updates }
            : c
        ),
      };

    case 'SELECT_COMPONENT':
      return {
        ...state,
        selectedComponentId: action.payload,
      };

    case 'DESELECT_COMPONENT':
      return {
        ...state,
        selectedComponentId: null,
      };

    case 'SET_PREVIEW_MODE':
      return {
        ...state,
        previewMode: action.payload,
      };

    case 'CLEAR_ALL':
      return initialState;

    case 'LOAD_COMPONENTS':
      return {
        ...state,
        components: action.payload,
      };

    default:
      return state;
  }
};

export const BuilderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  const addComponent = useCallback((component) => {
    dispatch({ type: 'ADD_COMPONENT', payload: component });
  }, []);

  const removeComponent = useCallback((id) => {
    dispatch({ type: 'REMOVE_COMPONENT', payload: id });
  }, []);

  const updateComponent = useCallback((id, updates) => {
    dispatch({ type: 'UPDATE_COMPONENT', payload: { id, updates } });
  }, []);

  const selectComponent = useCallback((id) => {
    dispatch({ type: 'SELECT_COMPONENT', payload: id });
  }, []);

  const deselectComponent = useCallback(() => {
    dispatch({ type: 'DESELECT_COMPONENT' });
  }, []);

  const setPreviewMode = useCallback((preview) => {
    dispatch({ type: 'SET_PREVIEW_MODE', payload: preview });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  const loadComponents = useCallback((components) => {
    dispatch({ type: 'LOAD_COMPONENTS', payload: components });
  }, []);

  const value = {
    state,
    addComponent,
    removeComponent,
    updateComponent,
    selectComponent,
    deselectComponent,
    setPreviewMode,
    clearAll,
    loadComponents,
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
};