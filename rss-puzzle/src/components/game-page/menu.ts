import Select from './select';
import Label from '../../basic-components/label';
import Component from '../../basic-components/component';
import data from '../../data/data';

class Menu extends Component {
  #level;

  #round;

  onChange;

  #levelSelect;

  #roundSelect;

  constructor(onChange: () => void) {
    super('div', 'menu');
    this.#level = Number(localStorage.getItem('level')) || 1;
    this.#round = Number(localStorage.getItem('round')) || 0;
    this.onChange = onChange;
    this.#roundSelect = new Select('menu__select', data[this.#level].rounds.length, { id: 'round-select' }, () => {
      this.#round = Number(this.#roundSelect.getValue()) - 1;
      localStorage.setItem('round', `${this.#round}`);
      localStorage.removeItem('autocompleted');
    });
    this.#roundSelect.setListener('change', onChange);
    this.#levelSelect = new Select('menu__select', 6, { id: 'level-select' }, () => {
      this.#level = Number(this.#levelSelect.getValue());
      localStorage.setItem('level', `${this.#level}`);
      this.#round = 0;
      localStorage.setItem('round', `${this.#round}`);
      this.replaceRoundSelect();
      localStorage.removeItem('autocompleted');
    });
    this.#levelSelect.setListener('change', onChange);
    this.appendChildren(
      new Label('menu__label', 'Select level:', { for: 'level-select' }),
      this.#levelSelect,
      new Label('menu__label', 'Select round:', { for: 'round-select' }),
      this.#roundSelect
    );
  }

  replaceRoundSelect() {
    const select = new Select('menu__select', data[this.#level].rounds.length, { id: 'round-select' }, () => {
      this.#round = Number(this.#roundSelect.getValue()) - 1;
      localStorage.setItem('round', `${this.#round}`);
      localStorage.removeItem('autocompleted');
    });
    select.setListener('change', this.onChange);
    this.#roundSelect.destroy();
    this.appendChildren(select);
    this.#roundSelect = select;
  }

  changeSelects() {
    this.#level = Number(localStorage.getItem('level')) || 1;
    const select = new Select('menu__select', 6, { id: 'level-select' }, () => {
      this.#level = Number(this.#levelSelect.getValue());
      localStorage.setItem('level', `${this.#level}`);
      this.replaceRoundSelect();
      this.#round = 0;
      localStorage.setItem('round', `${this.#round}`);
      localStorage.removeItem('autocompleted');
    });
    select.setListener('change', this.onChange);
    this.replaceChild(select, this.#levelSelect);
    this.#levelSelect = select;
    this.replaceRoundSelect();
  }
}

export default Menu;
