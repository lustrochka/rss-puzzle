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

  height;

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

  resultButton;

  autocompleteButton;

  bindedContinueGame;

  bindedCheckRow;

  isDragging;

  constructor(onClickResults: () => void) {
    super('div', 'game');
    this.level = 1;
    this.round = 0;
    this.phraseCount = 0;
    this.height = 0;
    this.hints = new Hints();
    this.menu = new Menu(() => {
      localStorage.setItem('phraseCount', '0');
      this.clear();
      this.render();
    });
    this.row = div('game__field__row');
    this.wordsRow = div('game__words__row');
    this.field = div('game__field');
    this.information = div('game__info hidden');
    this.wordsBlock = div('game__words');
    this.button = new Button('button hidden', 'Check', { type: 'button' });
    this.resultButton = new Button('button hidden', 'Results', { type: 'button' }, onClickResults);
    this.autocompleteButton = new Button('button autocomplete-button', "I don't know", { type: 'button' }, () => {
      this.showRightOrder();
    });
    this.indexesArray = [];
    this.sentence = [];
    this.bindedContinueGame = this.continueGame.bind(this);
    this.bindedCheckRow = this.checkRow.bind(this);
    this.render();
    this.onResize();
    this.isDragging = false;
  }

  render() {
    if (localStorage.getItem('level')) this.level = Number(localStorage.getItem('level'));
    if (localStorage.getItem('round')) this.round = Number(localStorage.getItem('round'));
    this.wordsRow.clear();
    this.field.clear();
    this.wordsBlock.clear();
    this.wordsBlock = div('game__words', this.wordsRow);
    this.hints = new Hints();
    const imgData = data[this.level].rounds[this.round].levelData;
    const img = new Image();
    img.src = `${BASE_URL}images/${data[this.level].rounds[this.round].levelData.imageSrc}`;
    img.onload = () => {
      this.height = img.height * (this.field.getNode().offsetWidth / img.width);
      this.wordsRow.setStyle('height', `${this.height / 10}px`);
      this.field.setStyle('height', `${this.height}px`);
      this.renderSentence();
    };
    this.information.changeText(`${imgData.author} - ${imgData.name} (${imgData.year})`);
    this.appendChildren(
      this.hints,
      this.menu,
      this.field,
      this.information,
      this.wordsBlock,
      div('game__buttons', this.button, this.autocompleteButton, this.resultButton)
    );
    this.autocompleteButton.removeClass('hidden');
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

  setLevel(level: number) {
    this.level = level;
    localStorage.setItem('level', `${this.level}`);
  }

  dragWord(child: Card) {
    let target: Component;
    let targetClass: string;
    let parent: Component;
    if (child.getNode().parentElement?.className === 'game__words__row') {
      target = this.row;
      parent = this.wordsRow;
      targetClass = '.game__field';
    } else {
      parent = this.row;
      target = this.wordsRow;
      targetClass = '.game__words';
    }
    let elemBelow: Element | null;
    document.onmousemove = (e) => {
      this.isDragging = true;
      child.setStyle('position', 'absolute');
      child.setStyle('z-index', '10');
      document.body.append(child.getNode());
      child.setStyle('left', `${e.pageX - child.getNode().offsetWidth / 2}px`);
      child.setStyle('top', `${e.pageY - child.getNode().offsetHeight / 2}px`);
      child.addClass('hidden');
      elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      child.removeClass('hidden');
    };
    child.getNode().onmouseup = () => {
      if (this.isDragging) {
        child.setStyle('position', 'static');
        child.setStyle('z-index', 'auto');
        if (
          parent === this.row &&
          elemBelow?.closest('.game__field__row') &&
          elemBelow?.closest('.game__words__item') &&
          Number(elemBelow?.closest('.game__words__item')?.id.slice(0, 1)) === this.phraseCount
        ) {
          const element = elemBelow.closest('.game__words__item');
          element?.insertAdjacentElement('afterend', child.getNode());
        } else if (elemBelow?.closest(`${targetClass}`)) {
          target.appendChildren(child);
        } else {
          parent.appendChildren(child);
        }
        this.isDragging = false;
      }
      child.getNode().onmouseup = null;
      document.onmousemove = null;
    };
  }

  moveWord(child: Card) {
    let target: Component;
    let height: number;
    if (!this.isDragging) {
      if (child.getNode().parentElement?.className === 'game__words__row') {
        target = this.row;
        height = -this.height + this.row.getNode().offsetTop;
        this.indexesArray.push(child.getIndex());
      } else {
        target = this.wordsRow;
        height = this.height - this.row.getNode().offsetTop;
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
  }

  renderSentence(random = true) {
    this.sentence = data[this.level].rounds[this.round].words[this.phraseCount].textExample.split(' ');
    this.row = div('game__field__row');
    this.row.setStyle('height', `${this.height / 10}px`);
    this.field.appendChildren(this.row);
    const cardsArray: Card[] = [];
    this.sentence.forEach((word, index) => {
      const card: Card = new Card(
        index,
        this.sentence,
        this.phraseCount,
        `${BASE_URL}images/${data[this.level].rounds[this.round].levelData.imageSrc}`,
        this.height,
        this.field.getNode().offsetWidth,
        () => this.moveWord(card),
        () => this.dragWord(card)
      );
      cardsArray.push(card);
    });
    if (random) {
      this.randomize(cardsArray).forEach((card) => {
        this.wordsRow.appendChildren(card);
      });
    } else {
      cardsArray.forEach((card) => {
        this.row.appendChildren(card);
      });
    }
  }

  setButton() {
    if (this.indexesArray.every((item, index) => item === index)) {
      this.changeToContinueButton();
    } else {
      this.button.removeClass('hidden');
      this.button.changeText('Check');
      this.button.removeListener('click', this.bindedContinueGame);
      this.button.setListener('click', this.bindedCheckRow);
    }
  }

  showRightOrder() {
    this.row.getNode().remove();
    this.renderSentence(false);
    this.wordsRow.clear();
    this.changeToContinueButton();
    this.hints.showHints();
    const autocompleted = JSON.parse(localStorage.getItem('autocompleted') || '[]');
    autocompleted.push(this.phraseCount);
    localStorage.setItem('autocompleted', JSON.stringify(autocompleted));
    this.autocompleteButton.addClass('hidden');
  }

  changeToContinueButton() {
    if (this.phraseCount === 9) this.saveCompletedRound();
    this.button.removeClass('hidden');
    this.hints.showHints();
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
      this.information.removeClass('hidden');
      this.resultButton.removeClass('hidden');
    }
  }

  continueGame() {
    this.indexesArray = [];
    const cards = this.row.getNode().children;
    for (const card of cards) {
      if (card instanceof HTMLElement) {
        card.onclick = null;
        card.onmousedown = null;
      }
    }
    if (this.phraseCount === 9) {
      this.phraseCount = 0;
      if (this.round === data[this.level].rounds.length) {
        this.level = this.level === 6 ? 1 : this.level + 1;
        this.round = 0;
      } else {
        this.round++;
      }
      this.setRound(this.round);
      this.setLevel(this.level);
      this.clear();
      this.render();
      this.resultButton.addClass('hidden');
      localStorage.removeItem('autocompleted');
    } else {
      this.phraseCount++;
      this.renderSentence();
      this.autocompleteButton.removeClass('hidden');
    }
    this.setPhraseCount(this.phraseCount);
    this.hints.toggleAudioHint(false);
    this.hints.toggleTextHint(false);
    this.button.toggleClass('hidden');
    this.menu.changeSelects();
  }

  saveCompletedRound() {
    const completed = JSON.parse(localStorage.getItem('completed') || '{}');
    if (this.level in completed) {
      completed[this.level].push(this.round + 1);
    } else {
      completed[this.level] = [this.round + 1];
    }
    localStorage.setItem('completed', JSON.stringify(completed));
  }

  checkRow() {
    const checkArray = this.indexesArray.map((item, index) => item === index);
    const cards = this.row.getNode().children;
    for (let i = 0; i < cards.length; i++) {
      if (!checkArray[i]) cards[i].classList.add('incorrect');
    }
  }

  onResize() {
    const windowWidth = window.matchMedia('(max-width: 850px)');
    windowWidth.addEventListener('change', (event) => {
      const cards = document.querySelectorAll('.game__words__item');
      if (event.matches) {
        this.height *= 0.8125;
      } else {
        this.height /= 0.8125;
      }
      this.wordsRow.setStyle('height', `${this.height / 10}px`);
      this.field.setStyle('height', `${this.height}px`);
      this.field
        .getNode()
        .querySelectorAll<HTMLElement>('.game__field__row')
        .forEach((el) => el.style.setProperty('height', `${this.height / 10}px`));
      cards.forEach((card) => {
        const phraseCount = Number(card.id.slice(0, 1));
        const newCard: Card = new Card(
          Number(card.id.slice(2)),
          data[this.level].rounds[this.round].words[phraseCount].textExample.split(' '),
          phraseCount,
          `${BASE_URL}images/${data[this.level].rounds[this.round].levelData.imageSrc}`,
          this.height,
          this.field.getNode().offsetWidth,
          () => this.moveWord(newCard),
          () => this.dragWord(newCard)
        );
        card.replaceWith(newCard.getNode());
      });
    });
  }
}

export default Game;
