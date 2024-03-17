import Component from '../../basic-components/component';
import { div, span } from '../../basic-components/tags';

class Card extends Component {
  #index;

  wholeLength;

  letterWidth;

  phraseCount;

  leftPosition;

  sentence;

  imgUrl;

  width;

  height;

  constructor(
    index: number,
    sentence: string[],
    phraseCount: number,
    imgUrl: string,
    height: number,
    onClick: () => void
  ) {
    super('div', 'game__words__item');
    this.#index = index;
    this.sentence = sentence;
    this.wholeLength = sentence.join('').length;
    this.letterWidth = 700 / this.wholeLength;
    this.phraseCount = phraseCount;
    this.leftPosition = this.sentence.slice(0, this.#index).join('').length * this.letterWidth;
    this.imgUrl = imgUrl;
    this.height = height;
    this.width = this.letterWidth * this.sentence[this.#index].length;
    this.setListener('click', onClick);
    this.appendChildren(this.renderLeftDiv());
    if (this.#index !== this.sentence.length - 1) this.appendChildren(this.renderRightDiv());
  }

  renderLeftDiv() {
    const leftDiv = div('', span('game__field__item-text', this.sentence[this.#index]));
    leftDiv.setStyle('width', `${this.width}px`);
    leftDiv.setStyle('background-image', `url(${this.imgUrl})`);
    leftDiv.setStyle('background-position', `left -${this.leftPosition}px top -${this.phraseCount * this.height}px`);
    if (this.#index === 0) leftDiv.setStyle('mask-image', 'none');
    return leftDiv;
  }

  renderRightDiv() {
    const rightDiv = div('');
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
