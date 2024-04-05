import Component from '../../basic-components/component';
import { div, h3, span, img, p } from '../../basic-components/tags';
import Button from '../../basic-components/button';
import data from '../../data/data';
import svg from '../../data/sound';
import { BASE_URL } from '../game-page/hints';

class Results extends Component {
  #level;

  #round;

  onClick;

  constructor(onClick: () => void) {
    super('div', 'results');
    this.onClick = onClick;
    this.#level = Number(localStorage.getItem('level')) || 1;
    this.#round = Number(localStorage.getItem('round')) || 0;
    this.render();
  }

  render() {
    const imgData = data[this.#level].rounds[this.#round].levelData;
    const autocompletedIndexes = JSON.parse(localStorage.getItem('autocompleted') || '[]');
    const unknownBlock = div('results__block', h3('results__block__title unknown', "I don't know"));
    const knownBlock = div('results__block', h3('results__block__title known', 'I know'));
    const phrases = data[this.#level].rounds[this.#round].words;
    const audio = new Audio();

    phrases.forEach((phrase, index) => {
      const icon = div('results__audio-icon');
      icon.getNode().innerHTML = svg;
      icon.setListener('click', () => {
        audio.pause();
        audio.src = `${BASE_URL}${data[this.#level].rounds[this.#round].words[index].audioExample}`;
        audio.play();
      });
      const phraseDiv = div('results__block__item', icon, span('', phrase.textExample));
      if (autocompletedIndexes.includes(index)) {
        unknownBlock.appendChildren(phraseDiv);
      } else {
        knownBlock.appendChildren(phraseDiv);
      }
    });

    const continueButton = new Button('results__button button', 'Continue', {}, () => this.continueGame());
    continueButton.setListener('click', this.onClick);

    this.appendChildren(
      img('results__image', `${BASE_URL}images/${data[this.#level].rounds[this.#round].levelData.cutSrc}`),
      p('results__info', `${imgData.author} - ${imgData.name} (${imgData.year})`),
      unknownBlock,
      knownBlock,
      continueButton
    );
  }

  continueGame() {
    localStorage.setItem('phraseCount', '0');
    if (this.#round === data[this.#level].rounds.length) {
      this.#level = this.#level === 6 ? 1 : this.#level + 1;
      this.#round = 0;
    } else {
      this.#round++;
    }
    localStorage.setItem('round', `${this.#round}`);
    localStorage.setItem('level', `${this.#level}`);
    localStorage.removeItem('autocompleted');
  }
}

export default Results;
