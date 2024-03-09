import { Items } from '../types';

class Component {
  #node: HTMLElement;

  constructor(tag: string, className: string, ...children: Component[]) {
    this.#node = document.createElement(tag);
    this.#node.className = className;
    if (children) {
      children.forEach((child) => this.#node.append(child.getNode()));
    }
  }

  toggleClass(className: string) {
    this.#node.classList.toggle(className);
  }

  setListener(event: string, listener: (arg: Event) => void) {
    this.#node.addEventListener(event, listener);
  }

  changeText(text: string) {
    this.#node.textContent = text;
  }

  addAttributes(attributes: Items) {
    Object.keys(attributes).forEach((el) => this.#node.setAttribute(el, attributes[el]));
  }

  deleteAttribute(attribute: string) {
    this.#node.removeAttribute(attribute);
  }

  appendChildren(...children: Component[]) {
    children.forEach((child) => this.#node.append(child.getNode()));
  }

  destroy() {
    this.#node.remove();
  }

  getNode() {
    return this.#node;
  }
}
export default Component;
