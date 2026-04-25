import React, { useRef, useState, useEffect } from "react";
import { useBuilderContext } from "../hooks/useBuilderContext";
import { componentTypes } from "../utils/componentUtils";


export const DraggableComponent = ({ component }) => {
  const { selectComponent, updateComponent } = useBuilderContext();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);

  const componentRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains("resize-handle")) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - component.x,
      y: e.clientY - component.y,
    });

    selectComponent(component.id);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    updateComponent(component.id, {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleResizeMove = (e) => {
    if (!isResizing || !componentRef.current) return;

    const rect = componentRef.current.parentElement.getBoundingClientRect();

    updateComponent(component.id, {
      width: Math.max(50, e.clientX - rect.left - component.x),
      height: Math.max(50, e.clientY - rect.top - component.y),
    });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  // Drag effect
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Resize effect
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);

      return () => {
        document.removeEventListener("mousemove", handleResizeMove);
        document.removeEventListener("mouseup", handleResizeEnd);
      };
    }
  }, [isResizing]);

  const renderContent = () => {
    switch (component.type) {
      case componentTypes.TEXT:
        return <p style={component.properties}>{component.properties.text}</p>;

      case componentTypes.HEADING:
        return <h1 style={component.properties}>{component.properties.text}</h1>;

      case componentTypes.BUTTON:
        return (
          <button style={component.properties}>
            {component.properties.text}
          </button>
        );

      case componentTypes.IMAGE:
        return (
          <img
            src={component.properties.src}
            alt={component.properties.alt}
            style={{ width: "100%", height: "100%" }}
          />
        );

      case componentTypes.INPUT:
        return (
          <input
            placeholder={component.properties.placeholder}
            style={{ width: "100%", height: "100%" }}
          />
        );

      case componentTypes.CONTAINER:
        return <div style={component.properties} />;

      default:
        return null;
    }
  };

  return (
    <div
      ref={componentRef}
      className="canvas-element"
      onMouseDown={handleMouseDown}
      onClick={() => selectComponent(component.id)}
      style={{
        position: "absolute",
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height,
      }}
    >
      {renderContent()}
      <div className="resize-handle" onMouseDown={handleResizeStart} />
    </div>
  );
};