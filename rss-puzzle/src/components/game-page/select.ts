import Component from '../../basic-components/component';
import Option from '../../basic-components/option';
import { Items } from '../../types';

class Select extends Component<HTMLSelectElement> {
  constructor(className: string, quantity: number, attributes: Items, onChange: () => void) {
    super('select', className);
    if (onChange) this.setListener('change', onChange);
    this.addAttributes(attributes);
    const completed = JSON.parse(localStorage.getItem('completed') || '{}');
    const level = Number(localStorage.getItem('level')) || 1;
    const round = Number(localStorage.getItem('round')) || 0;
    for (let i = 1; i <= quantity; i++) {
      const option = new Option('', { value: `${i}` }, `${i}`);
      if (attributes.id === 'level-select') {
        if (i === level) option.addAttributes({ selected: 'true' });
      } else {
        if (i - 1 === round) option.addAttributes({ selected: 'true' });
        if (level in completed && i - 1 in completed[level]) option.addClass('completed');
      }
      this.appendChildren(option);
    }
  }

  getValue() {
    return this.getNode().value;
  }
}

export default Select;
