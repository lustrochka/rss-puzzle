import Component from '../../basic-components/component';
import { div } from '../../basic-components/tags';
import Button from '../../basic-components/button';
import svg from '../../data/sound';
import data from '../../data/wordCollectionLevel1.json';

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
    this.#isTextHintShown = false;
    this.#isAudioHintShown = false;
    this.#textHintButton = new Button('hints__text-hint-button', 'Show translation', {}, () => this.toggleTextHint());
    this.#audioHintButton = new Button('hints__audio-hint-button', 'Show audio', {}, () => this.toggleAudioHint());
    this.#textHint = div('hints__text-hint');
    this.#audioHint = this.renderTextHint();
    this.appendChildren(this.#audioHintButton, this.#audioHint, this.#textHintButton, this.#textHint);
  }

  getRound() {
    return Number(localStorage.getItem('round')) || 0;
  }

  getPhraseCount() {
    return Number(localStorage.getItem('phraseCount')) || 0;
  }

  renderTextHint() {
    const hint = div('hints__audio-hint hidden');
    hint.getNode().innerHTML = svg;
    hint.setListener('click', () => {
      hint.addClass('animated');
      const audio = new Audio(`${BASE_URL}${data.rounds[this.getRound()].words[this.getPhraseCount()].audioExample}`);
      audio.play();
      audio.addEventListener('pause', () => {
        hint.removeClass('animated');
      });
    });
    return hint;
  }

  toggleTextHint() {
    if (!this.#isTextHintShown) {
      this.#textHintButton.changeText('Hide translation');
      this.#textHint.changeText(`${data.rounds[this.getRound()].words[this.getPhraseCount()].textExampleTranslate}`);
    } else {
      this.#textHintButton.changeText('Show translation');
      this.#textHint.changeText('');
    }
    this.#isTextHintShown = !this.#isTextHintShown;
  }

  toggleAudioHint() {
    if (!this.#isAudioHintShown) {
      this.#audioHintButton.changeText('Hide audio');
      this.#audioHint.removeClass('hidden');
    } else {
      this.#audioHintButton.changeText('Show audio');
      this.#audioHint.addClass('hidden');
    }
    this.#isAudioHintShown = !this.#isAudioHintShown;
  }
}

export default Hints;
