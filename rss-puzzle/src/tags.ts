import Component from './component';
import { Items } from './types';

export const div = (className: string, text: string, attributes: Items, ...children: HTMLElement[]) =>
  new Component('div', className, text, attributes, ...children);

export const p = (className: string, text: string, attributes: Items, ...children: HTMLElement[]) =>
  new Component('p', className, text, attributes, ...children);
