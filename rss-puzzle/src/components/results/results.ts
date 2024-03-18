import Component from '../../basic-components/component';
import { div, h3, span, img, p } from '../../basic-components/tags';
import Button from '../../basic-components/button';
import data from '../../data/data';
import svg from '../../data/sound';
import { BASE_URL } from '../game-page/hints';

class Results extends Component {
  onClick;

  constructor(onClick: () => void) {
    super('div', 'results');
    this.onClick = onClick;
    this.render();
  }

  render() {
    let level = Number(localStorage.getItem('level')) || 1;
    let round = Number(localStorage.getItem('round')) || 0;
    const imgData = data[level].rounds[round].levelData;
    const autocompletedIndexes = JSON.parse(localStorage.getItem('autocompleted') || '[]');
    const unknownBlock = div('results__block', h3('results__block__title unknown', "I don't know"));
    const knownBlock = div('results__block', h3('results__block__title known', 'I know'));
    const phrases = data[level].rounds[round].words;
    const audio = new Audio();
    phrases.forEach((phrase, index) => {
      const icon = div('results__audio-icon');
      icon.getNode().innerHTML = svg;
      icon.setListener('click', () => {
        audio.pause();
        audio.src = `${BASE_URL}${data[level].rounds[round].words[index].audioExample}`;
        audio.play();
      });
      const phraseDiv = div('results__block__item', icon, span('', phrase.textExample));
      if (index in autocompletedIndexes) {
        unknownBlock.appendChildren(phraseDiv);
      } else {
        knownBlock.appendChildren(phraseDiv);
      }
    });
    const continueButton = new Button('results__button button', 'Continue', {}, () => {
      localStorage.setItem('phraseCount', '0');
      if (round === data[level].rounds.length) {
        level++;
        round = 0;
      } else {
        round++;
      }
      localStorage.setItem('round', `${round}`);
      localStorage.setItem('level', `${level}`);
    });
    continueButton.setListener('click', this.onClick);
    this.appendChildren(
      img('results__image', `${BASE_URL}images/${data[level].rounds[round].levelData.cutSrc}`),
      p('results__info', `${imgData.author} - ${imgData.name} (${imgData.year})`),
      unknownBlock,
      knownBlock,
      new Button('results__button button', 'Continue', {}, this.onClick)
    );
  }
}

export default Results;
