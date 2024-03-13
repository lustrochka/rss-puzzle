import Component from '../../basic-components/component';

class Card extends Component {
  #index;

  constructor(index: number, text: string, wholeLength: number, onClick: () => void) {
    super('div', 'game__words__item');
    this.#index = index;
    this.changeText(text);
    this.setStyle('width', `${(700 / wholeLength) * text.length}px`);
    this.setListener('click', onClick);
  }

  getIndex() {
    return this.#index;
  }
}

export default Card;
