import { v4 as uuidv4 } from 'uuid';

export const componentTypes = {
  TEXT: 'text',
  BUTTON: 'button',
  IMAGE: 'image',
  CONTAINER: 'container',
  INPUT: 'input',
  HEADING: 'heading',
};

export const createComponent = (type) => {
  const id = uuidv4();
  const baseComponent = {
    id,
    type,
    x: 50,
    y: 50,
    width: 200,
    height: 50,
    properties: {},
  };

  switch (type) {
    case componentTypes.TEXT:
      return {
        ...baseComponent,
        width: 300,
        height: 50,
        properties: {
          text: 'Click to edit text',
          fontSize: 16,
          fontWeight: 400,
          color: '#000000',
          alignment: 'left',
        },
      };
    case componentTypes.BUTTON:
      return {
        ...baseComponent,
        width: 150,
        height: 40,
        properties: {
          text: 'Button',
          backgroundColor: '#2563eb',
          textColor: '#ffffff',
          borderRadius: 6,
          fontSize: 14,
        },
      };
    case componentTypes.IMAGE:
      return {
        ...baseComponent,
        width: 250,
        height: 200,
        properties: {
          src: 'https://via.placeholder.com/250x200?text=Image',
          alt: 'Image',
        },
      };
    case componentTypes.CONTAINER:
      return {
        ...baseComponent,
        width: 400,
        height: 300,
        properties: {
          backgroundColor: '#f3f4f6',
          borderRadius: 8,
          padding: 16,
          border: '1px solid #e5e7eb',
        },
      };
    case componentTypes.INPUT:
      return {
        ...baseComponent,
        width: 200,
        height: 40,
        properties: {
          placeholder: 'Enter text...',
          backgroundColor: '#ffffff',
          borderColor: '#d1d5db',
          borderWidth: 1,
          borderRadius: 6,
        },
      };
    case componentTypes.HEADING:
      return {
        ...baseComponent,
        width: 300,
        height: 50,
        properties: {
          text: 'Heading',
          fontSize: 32,
          fontWeight: 700,
          color: '#000000',
          alignment: 'left',
        },
      };
    default:
      return baseComponent;
  }
};

export const generateHTML = (components) => {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: #ffffff;
    }
    
    .container {
      position: relative;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
`;

  components.forEach(comp => {
    const style = `style="position: absolute; left: ${comp.x}px; top: ${comp.y}px; width: ${comp.width}px; height: ${comp.height}px;"`;

    switch (comp.type) {
      case componentTypes.TEXT:
        html += `    <p ${style} style="font-size: ${comp.properties.fontSize}px; color: ${comp.properties.color}; text-align: ${comp.properties.alignment}; font-weight: ${comp.properties.fontWeight};">${comp.properties.text}</p>\n`;
        break;
      case componentTypes.HEADING:
        html += `    <h1 ${style} style="font-size: ${comp.properties.fontSize}px; color: ${comp.properties.color}; text-align: ${comp.properties.alignment}; font-weight: ${comp.properties.fontWeight};">${comp.properties.text}</h1>\n`;
        break;
      case componentTypes.BUTTON:
        html += `    <button ${style} style="background-color: ${comp.properties.backgroundColor}; color: ${comp.properties.textColor}; border: none; border-radius: ${comp.properties.borderRadius}px; font-size: ${comp.properties.fontSize}px; cursor: pointer;">${comp.properties.text}</button>\n`;
        break;
      case componentTypes.IMAGE:
        html += `    <img ${style} src="${comp.properties.src}" alt="${comp.properties.alt}" />\n`;
        break;
      case componentTypes.INPUT:
        html += `    <input ${style} type="text" placeholder="${comp.properties.placeholder}" style="border: ${comp.properties.borderWidth}px solid ${comp.properties.borderColor}; border-radius: ${comp.properties.borderRadius}px; padding: 10px;" />\n`;
        break;
      case componentTypes.CONTAINER:
        html += `    <div ${style} style="background-color: ${comp.properties.backgroundColor}; border-radius: ${comp.properties.borderRadius}px; padding: ${comp.properties.padding}px; border: ${comp.properties.border};"></div>\n`;
        break;
      default:
        break;
    }
  });

  html += `  </div>
</body>
</html>`;

  return html;
};

export const downloadHTML = (components, filename = 'index.html') => {
  const html = generateHTML(components);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};