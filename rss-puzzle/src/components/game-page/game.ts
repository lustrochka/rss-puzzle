import Component from '../../basic-components/component';
import { div } from '../../basic-components/tags';
import data from '../../data/wordCollectionLevel1.json';

const SENTENCE = data.rounds[0].words[0].textExample;
const LETTERS_COUNT = SENTENCE.split(' ').join('').length;

class Game extends Component {
  field;

  wordsBlock;

  row;

  constructor() {
    super('div', 'game-page');
    this.row = div('game__filed__row');
    this.field = div('game__field', this.row);
    this.wordsBlock = div('game__words');
    this.appendChildren(this.field, this.wordsBlock);
    this.randomize().forEach((word) => {
      const child = div('game__words__item');
      child.changeText(word);
      child.setWidth(`${(700 / LETTERS_COUNT) * word.length}px`);
      this.wordsBlock.appendChildren(child);
      child.setListener('click', () => {
        child.getNode().style.transform = `translate(${-(child.getNode().offsetLeft - this.row.getNode().offsetWidth)}px, -500px)`;
        setTimeout(() => {
          child.getNode().style.transition = '0s';
          child.getNode().style.transform = 'translate(0, 0)';
          this.row.appendChildren(child);
        }, 500);
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
}

export default Game;
