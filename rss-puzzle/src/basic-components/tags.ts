import Component from './component';

export const div = (className: string, ...children: Component[]) => new Component('div', className, ...children);

export const p = (className: string, text: string, ...children: Component[]) => {
  const element = new Component('p', className, ...children);
  element.changeText(text);
  return element;
};

export const span = (className: string, text: string, ...children: Component[]) => {
  const element = new Component('span', className, ...children);
  element.changeText(text);
  return element;
};

export const h1 = (className: string, text: string, ...children: Component[]) => {
  const element = new Component('h1', className, ...children);
  element.changeText(text);
  return element;
};

export const h3 = (className: string, text: string, ...children: Component[]) => {
  const element = new Component('h1', className, ...children);
  element.changeText(text);
  return element;
};

export const img = (className: string, src: string) => {
  const element = new Component('img', className);
  element.addAttributes({ src });
  return element;
};
