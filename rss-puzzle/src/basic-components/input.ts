import Component from './component';
import { Items } from '../types';

class Input extends Component<HTMLInputElement> {
  constructor(className: string, attributes: Items, onChange?: () => void) {
    super('input', className);
    this.addAttributes(attributes);
    if (onChange) this.setListener('input', onChange);
  }

  getValue() {
    return this.getNode().value;
  }
}

export default Input;
