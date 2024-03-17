import Component from '../../basic-components/component';
import Card from './card';
import Button from '../../basic-components/button';
import Hints, { BASE_URL } from './hints';
import { div } from '../../basic-components/tags';
import data from '../../data/data';
import Menu from './menu';

class Game extends Component {
  level;

  round;

  phraseCount;

  hints;

  menu;

  field;

  information;

  wordsBlock;

  row;

  wordsRow;

  indexesArray: number[];

  sentence: string[];

  button;

  bindedContinueGame;

  bindedCheckRow;

  constructor() {
    super('div', 'game-page');
    this.level = 1;
    this.round = 0;
    this.phraseCount = 0;
    this.hints = new Hints();
    this.menu = new Menu(() => {
      this.clear();
      this.render();
    });
    this.row = div('game__field__row');
    this.wordsRow = div('game__words__row');
    this.field = div('game__field');
    this.information = div('game__info hidden');
    this.wordsBlock = div('game__words');
    this.button = new Button('button hidden', 'Check', { type: 'button' });
    this.indexesArray = [];
    this.sentence = [];
    this.bindedContinueGame = this.continueGame.bind(this);
    this.bindedCheckRow = this.checkRow.bind(this);
    this.render();
  }

  render() {
    if (localStorage.getItem('level')) this.level = Number(localStorage.getItem('level'));
    if (localStorage.getItem('round')) this.round = Number(localStorage.getItem('round'));
    this.wordsRow.setStyle('height', `${530 / data[this.level].rounds[this.round].words.length}px`);
    this.wordsRow.clear();
    this.field.clear();
    this.wordsBlock.clear();
    this.wordsBlock = div('game__words', this.wordsRow);
    this.hints = new Hints();
    const imgData = data[this.level].rounds[this.round].levelData;
    this.information.changeText(`${imgData.author} - ${imgData.name} (${imgData.year})`);
    this.appendChildren(this.hints, this.menu, this.field, this.information, this.wordsBlock, this.button);
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

  setRound(round: number) {
    this.round = round;
    localStorage.setItem('round', `${this.round}`);
  }

  setPhraseCount(phraseCount: number) {
    this.phraseCount = phraseCount;
    localStorage.setItem('phraseCount', `${this.phraseCount}`);
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
    for (let i = 0; i < this.row.getNode().children.length; i++)
      this.row.getNode().children[i].classList.remove('incorrect');
    if (this.indexesArray.length === this.sentence.length) this.setButton();
  }

  renderSentence() {
    this.sentence = data[this.level].rounds[this.round].words[this.phraseCount].textExample.split(' ');
    this.row = div('game__field__row');
    const height = 530 / data[this.level].rounds[this.round].words.length;
    this.field.appendChildren(this.row);
    this.row.setStyle('height', `${height}px`);
    const cardsArray: Card[] = [];
    this.sentence.forEach((word, index) => {
      const card: Card = new Card(
        index,
        this.sentence,
        this.phraseCount,
        `${BASE_URL}images/${data[this.level].rounds[this.round].levelData.imageSrc}`,
        height,
        () => this.moveWord(card)
      );
      cardsArray.push(card);
    });
    this.randomize(cardsArray).forEach((card) => {
      this.wordsRow.appendChildren(card);
    });
  }

  setButton() {
    this.button.removeClass('hidden');
    if (this.indexesArray.every((item, index) => item === index)) {
      this.hints.toggleTextHint();
      this.hints.toggleAudioHint();
      this.button.changeText('Continue');
      this.button.removeListener('click', this.bindedCheckRow);
      this.button.setListener('click', this.bindedContinueGame);
      if (this.phraseCount === 9) {
        this.field
          .getNode()
          .querySelectorAll('.game__words__item')
          .forEach((item) => {
            item.classList.add('solid');
          });
        this.field
          .getNode()
          .querySelectorAll('.game__field__row')
          .forEach((item) => {
            item.classList.add('solid');
          });
        this.information.removeClass('hidden');
      }
    } else {
      this.button.changeText('Check');
      this.button.removeListener('click', this.bindedContinueGame);
      this.button.setListener('click', this.bindedCheckRow);
    }
  }

  continueGame() {
    this.indexesArray = [];
    this.setPhraseCount(++this.phraseCount);
    this.renderSentence();
    this.button.toggleClass('hidden');
  }

  checkRow() {
    const checkArray = this.indexesArray.map((item, index) => item === index);
    const cards = this.row.getNode().children;
    for (let i = 0; i < cards.length; i++) {
      if (!checkArray[i]) cards[i].classList.add('incorrect');
    }
  }
}

export default Game;
