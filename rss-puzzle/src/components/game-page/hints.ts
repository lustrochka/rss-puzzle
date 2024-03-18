import Component from '../../basic-components/component';
import { div } from '../../basic-components/tags';
import Button from '../../basic-components/button';
import svg from '../../data/sound';
import data from '../../data/data';

export const BASE_URL = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/';

class Hints extends Component {
  #isTextHintShown;

  #isAudioHintShown;

  #textHintButton;

  #audioHintButton;

  #textHint;

  #audioHint;

  constructor() {
    super('div', 'hints');
    this.#isTextHintShown = true;
    if (localStorage.getItem('text-hint')) this.#isTextHintShown = localStorage.getItem('text-hint') === 'true';
    this.#isAudioHintShown = true;
    if (localStorage.getItem('audio-hint')) this.#isAudioHintShown = localStorage.getItem('audio-hint') === 'true';
    this.#textHintButton = new Button('hints__text-hint-button', 'Hide translation', {}, () => this.toggleTextHint());
    this.#audioHintButton = new Button('hints__audio-hint-button', 'Hide audio', {}, () => this.toggleAudioHint());
    this.#textHint = div('hints__text-hint');
    this.#audioHint = this.renderAudioHint();
    this.toggleAudioHint(false);
    this.toggleTextHint(false);
    this.appendChildren(this.#audioHintButton, this.#audioHint, this.#textHintButton, this.#textHint);
  }

  getLevel() {
    return Number(localStorage.getItem('level')) || 1;
  }

  getRound() {
    return Number(localStorage.getItem('round')) || 0;
  }

  getPhraseCount() {
    return Number(localStorage.getItem('phraseCount')) || 0;
  }

  renderAudioHint() {
    const hint = div('hints__audio-hint');
    hint.getNode().innerHTML = svg;
    hint.setListener('click', () => {
      hint.addClass('animated');
      const audio = new Audio(
        `${BASE_URL}${data[this.getLevel()].rounds[this.getRound()].words[this.getPhraseCount()].audioExample}`
      );
      audio.play();
      audio.addEventListener('pause', () => {
        hint.removeClass('animated');
      });
    });
    return hint;
  }

  toggleTextHint(change = true) {
    if (change) this.#isTextHintShown = !this.#isTextHintShown;
    if (this.#isTextHintShown) {
      this.#textHintButton.changeText('Hide translation');
      this.#textHint.changeText(
        `${data[this.getLevel()].rounds[this.getRound()].words[this.getPhraseCount()].textExampleTranslate}`
      );
    } else {
      this.#textHintButton.changeText('Show translation');
      this.#textHint.changeText('');
    }
    localStorage.setItem('text-hint', `${this.#isTextHintShown}`);
  }

  toggleAudioHint(change = true) {
    if (change) this.#isAudioHintShown = !this.#isAudioHintShown;
    if (this.#isAudioHintShown) {
      this.#audioHintButton.changeText('Hide audio');
      this.#audioHint.removeClass('hidden');
    } else {
      this.#audioHintButton.changeText('Show audio');
      this.#audioHint.addClass('hidden');
    }
    localStorage.setItem('audio-hint', `${this.#isAudioHintShown}`);
  }
}

export default Hints;
