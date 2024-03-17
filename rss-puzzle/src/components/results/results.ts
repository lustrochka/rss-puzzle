import Component from '../../basic-components/component';
import { div, h3, span } from '../../basic-components/tags';
import data from '../../data/data';
import { BASE_URL } from '../game-page/hints';

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
    const audio = new Audio();
    phrases.forEach((phrase, index) => {
      const icon = span('', '🔊');
      icon.setListener('click', () => {
        audio.pause();
        audio.src = `${BASE_URL}${data[level].rounds[round].words[index].audioExample}`;
        audio.play();
      });
      const phraseDiv = div('', icon, span('', phrase.textExample));
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
