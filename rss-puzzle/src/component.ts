import { Items } from './types';

class Component extends HTMLElement {
  #node: HTMLElement;

  constructor(tag: string, className: string, text: string, attributes?: Items, ...children: HTMLElement[]) {
    super();
    this.#node = document.createElement(tag);
    this.#node.className = className;
    this.#node.textContent = text;
    if (attributes) {
      Object.keys(attributes).forEach((el) => this.#node.setAttribute(el, attributes[el]));
    }
    if (children) {
      children.forEach((child) => this.#node.append(child));
    }
  }

  toggleClass(className: string) {
    this.#node.classList.toggle(className);
  }

  changeText(text: string) {
    this.#node.textContent = text;
  }

  destroy() {
    this.#node.remove();
  }
}
export default Component;
