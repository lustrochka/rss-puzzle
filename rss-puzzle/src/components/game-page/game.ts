import Component from '../../basic-components/component';
import Card from './card';
import Button from '../../basic-components/button';
import { div } from '../../basic-components/tags';
import data from '../../data/wordCollectionLevel1.json';

class Game extends Component {
  round;

  phraseCount;

  field;

  wordsBlock;

  row;

  wordsRow;

  indexesArray: number[];

  sentence: string[];

  constructor() {
    super('div', 'game-page');
    this.round = 0;
    this.phraseCount = 0;
    this.row = div('game__field__row');
    this.wordsRow = div('game__words__row');
    this.field = div('game__field');
    this.wordsBlock = div('game__words', this.wordsRow);
    this.appendChildren(this.field, this.wordsBlock);
    this.indexesArray = [];
    this.sentence = [];
    this.renderSentence();
  }

  randomize(array: Card[]) {
    const result = [];
    while (array.length > 0) {
      const index = Math.floor(Math.random() * array.length);
      result.push(array[index]);
      array.splice(index, 1);
    }
    return result;
  }

  moveWord(child: Card) {
    let target: Component;
    let height: number;
    if (child.getNode().parentElement?.className === 'game__words__row') {
      target = this.row;
      height = -500 + this.row.getNode().offsetTop;
      this.indexesArray.push(child.getIndex());
    } else {
      target = this.wordsRow;
      height = 500 - this.row.getNode().offsetTop;
      this.indexesArray.splice(this.indexesArray.indexOf(child.getIndex()), 1);
    }
    child.setStyle(
      'transform',
      `translate(${-(child.getNode().offsetLeft - target.getNode().offsetWidth)}px, ${height}px)`
    );
    setTimeout(() => {
      child.setStyle('transition', '0s');
      child.setStyle('transform', 'translate(0, 0)');
      target.appendChildren(child);
      child.setStyle('transition', '0.2s');
    }, 200);
    if (this.checkRow()) this.addContinueButton();
  }

  renderSentence() {
    this.sentence = data.rounds[this.round].words[this.phraseCount].textExample.split(' ');
    const lettersCount = this.sentence.join('').length;
    this.row = div('game__field__row');
    this.field.appendChildren(this.row);
    const cardsArray: Card[] = [];
    this.sentence.forEach((word, index) => {
      const card: Card = new Card(index, word, lettersCount, () => this.moveWord(card));
      cardsArray.push(card);
    });
    this.randomize(cardsArray).forEach((card) => {
      this.wordsRow.appendChildren(card);
    });
  }

  checkRow() {
    return (
      this.indexesArray.every((item, index) => item === index) && this.indexesArray.length === this.sentence.length
    );
  }

  addContinueButton() {
    const continueButton = new Button('button', 'Continue', { type: 'button' }, () => {
      this.indexesArray = [];
      this.phraseCount++;
      this.renderSentence();
      continueButton.destroy();
    });
    this.appendChildren(continueButton);
  }
}

export default Game;
