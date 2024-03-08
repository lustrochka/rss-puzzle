import Component from './component';

export const div = (className: string, ...children: Component[]) => new Component('div', className, ...children);

export const p = (className: string, ...children: Component[]) => new Component('p', className, ...children);

export const span = (className: string, text: string, ...children: Component[]) => {
  const element = new Component('span', className, ...children);
  element.changeText(text);
  return element;
};
