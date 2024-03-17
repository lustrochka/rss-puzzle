import Select from '../../basic-components/select';
import Label from '../../basic-components/label';
import Component from '../../basic-components/component';
import data from '../../data/data';

class Menu extends Component {
  level;

  round;

  onChange;

  roundSelect;

  constructor(onChange: () => void) {
    super('div', 'menu');
    this.level = Number(localStorage.getItem('level')) || 1;
    this.round = Number(localStorage.getItem('round')) || 0;
    this.onChange = onChange;
    this.roundSelect = new Select('menu__select', data[this.level].rounds.length, { id: 'round-select' }, () => {
      this.round = Number(this.roundSelect.getValue()) - 1;
      localStorage.setItem('round', `${this.round}`);
    });
    this.roundSelect.setListener('change', onChange);
    const select = new Select('menu__select', 6, { id: 'level-select' }, () => {
      this.level = Number(select.getValue());
      localStorage.setItem('level', `${this.level}`);
      this.replaceRoundSelect();
      this.round = 0;
      localStorage.setItem('round', `${this.round}`);
    });
    select.setListener('change', onChange);
    this.appendChildren(
      new Label('menu__label', 'Select level:', { for: 'level-select' }),
      select,
      new Label('menu__label', 'Select round:', { for: 'round-select' }),
      this.roundSelect
    );
  }

  replaceRoundSelect() {
    const select = new Select('menu__select', data[this.level].rounds.length, { id: 'round-select' }, () => {
      this.round = Number(this.roundSelect.getValue()) - 1;
      localStorage.setItem('round', `${this.round}`);
    });
    select.setListener('change', this.onChange);
    this.roundSelect.destroy();
    this.appendChildren(select);
    this.roundSelect = select;
  }
}

export default Menu;
