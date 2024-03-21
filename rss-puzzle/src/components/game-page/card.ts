import Component from '../../basic-components/component';
import { div, span } from '../../basic-components/tags';

class Card extends Component {
  #index;

  wholeLength;

  height;

  letterWidth;

  phraseCount;

  leftPosition;

  sentence;

  imgUrl;

  width;

  constructor(
    index: number,
    sentence: string[],
    phraseCount: number,
    imgUrl: string,
    wholeHeight: number,
    wholeWidth: number,
    onClick: () => void,
    onMouseDown: () => void
  ) {
    super('div', 'game__words__item');
    this.#index = index;
    this.sentence = sentence;
    this.wholeLength = sentence.join('').length;
    this.height = wholeHeight / 10;
    this.letterWidth = wholeWidth / this.wholeLength;
    this.phraseCount = phraseCount;
    this.leftPosition = this.sentence.slice(0, this.#index).join('').length * this.letterWidth;
    this.imgUrl = imgUrl;
    this.width = this.letterWidth * this.sentence[this.#index].length;
    this.addAttributes({ id: `${phraseCount} ${index}` });
    this.setStyle('height', `${this.height}px`);
    this.getNode().onclick = onClick;
    this.getNode().onmousedown = onMouseDown;
    this.appendChildren(this.renderLeftDiv());
    if (this.#index !== this.sentence.length - 1) this.appendChildren(this.renderRightDiv());
  }

  renderLeftDiv() {
    const itemText = span('card__text', this.sentence[this.#index]);
    if (this.sentence[this.#index].length === 1) itemText.setStyle('transform', 'translateX(5px)');
    const leftDiv = div('card__left-element', itemText);
    leftDiv.setStyle('width', `${this.width}px`);
    leftDiv.setStyle('background-image', `url(${this.imgUrl})`);
    leftDiv.setStyle('background-position', `left -${this.leftPosition}px top -${this.phraseCount * this.height}px`);
    if (this.#index === 0) leftDiv.setStyle('mask-image', 'none');
    return leftDiv;
  }

  renderRightDiv() {
    const rightDiv = div('card__right-element');
    rightDiv.setStyle('background-image', `url(${this.imgUrl})`);
    rightDiv.setStyle(
      'background-position',
      `left ${-this.leftPosition - this.width}px top -${this.phraseCount * this.height}px`
    );
    return rightDiv;
  }

  getIndex() {
    return this.#index;
  }
}

export default Card;
