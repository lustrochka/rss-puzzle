import Component from '../../basic-components/component';
import { div, h3 } from '../../basic-components/tags';
import data from '../../data/data';

class Results extends Component {
  constructor() {
    super('div', 'results');
    this.render();
  }

  render() {
    const level = Number(localStorage.getItem('level')) || 1;
    const round = Number(localStorage.getItem('round')) || 0;
    const autocompletedIndexes = JSON.parse(localStorage.getItem('autocompleted') || '[]');
    const unknownBlock = div('results__block', h3('results__block__title', "I don't know"));
    const knownBlock = div('results__block', h3('results__block__title', 'I know'));
    const phrases = data[level].rounds[round].words;
    phrases.forEach((phrase, index) => {
      const phraseDiv = div('');
      phraseDiv.changeText(phrase.textExample);
      if (index in autocompletedIndexes) {
        unknownBlock.appendChildren(phraseDiv);
      } else {
        knownBlock.appendChildren(phraseDiv);
      }
    });
    this.appendChildren(unknownBlock, knownBlock);
  }
}

export default Results;
