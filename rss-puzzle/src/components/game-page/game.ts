import Component from '../../basic-components/component';
import { div } from '../../basic-components/tags';
import data from '../../data/wordCollectionLevel1.json';

const SENTENCE = data.rounds[0].words[0].textExample;
const LETTERS_COUNT = SENTENCE.split(' ').join('').length;

class Game extends Component {
  field;

  wordsBlock;

  row;

  wordsRow;

  constructor() {
    super('div', 'game-page');
    this.row = div('game__field__row');
    this.wordsRow = div('game__words__row');
    this.field = div('game__field', this.row);
    this.wordsBlock = div('game__words', this.wordsRow);
    this.appendChildren(this.field, this.wordsBlock);
    this.randomize().forEach((word) => {
      const child = div('game__words__item');
      child.changeText(word);
      child.setStyle('width', `${(700 / LETTERS_COUNT) * word.length}px`);
      this.wordsRow.appendChildren(child);
      child.setListener('click', () => {
        this.moveWord(child);
      });
    });
  }

  randomize() {
    const array = SENTENCE.split(' ');
    const result = [];
    while (array.length > 0) {
      const index = Math.floor(Math.random() * array.length);
      result.push(array[index]);
      array.splice(index, 1);
    }
    return result;
  }

  moveWord(child: Component) {
    let target: Component;
    let height: number;
    if (child.getNode().parentElement?.className === 'game__words__row') {
      target = this.row;
      height = -500;
    } else {
      target = this.wordsRow;
      height = 500;
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
  }
}

export default Game;
