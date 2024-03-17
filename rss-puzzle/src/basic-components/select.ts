import Component from './component';
import Option from './option';
import { Items } from '../types';

class Select extends Component<HTMLSelectElement> {
  constructor(className: string, quantity: number, attributes: Items, onChange: () => void) {
    super('select', className);
    if (onChange) this.setListener('change', onChange);
    this.addAttributes(attributes);
    for (let i = 1; i <= quantity; i++) {
      this.appendChildren(new Option('', { value: `${i}` }, `${i}`));
    }
  }

  getValue() {
    return this.getNode().value;
  }
}

export default Select;
