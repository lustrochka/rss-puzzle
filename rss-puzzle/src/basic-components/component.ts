import { Items } from '../types';

class Component<T extends HTMLElement = HTMLElement> {
  #node: T;

  constructor(tag: string, className: string, ...children: Component[]) {
    this.#node = document.createElement(tag) as T;
    this.#node.className = className;
    if (children) {
      children.forEach((child) => this.#node.append(child.getNode()));
    }
  }

  addClass(className: string) {
    this.#node.classList.add(className);
  }

  toggleClass(className: string) {
    this.#node.classList.toggle(className);
  }

  removeClass(className: string) {
    this.#node.classList.remove(className);
  }

  setListener(event: string, listener: (arg: Event) => void) {
    this.#node.addEventListener(event, listener);
  }

  removeListener(event: string, listener: (arg: Event) => void) {
    this.#node.removeEventListener(event, listener);
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

  replaceChild(oldChild: Component, newChild: Component) {
    this.#node.replaceChild(oldChild.getNode(), newChild.getNode());
  }

  destroy() {
    this.#node.remove();
  }

  getNode() {
    return this.#node;
  }

  setStyle(property: string, value: string) {
    this.#node.style.setProperty(property, value);
  }

  clear() {
    this.#node.innerHTML = '';
  }
}
export default Component;
