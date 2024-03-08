import Component from './component';

export const div = (className: string, text: string, ...children: Component[]) =>
  new Component('div', className, ...children);

export const p = (className: string, text: string, ...children: Component[]) =>
  new Component('p', className, ...children);
