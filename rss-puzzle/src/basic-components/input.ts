import Component from './component';
import { Items } from '../types';

class Input extends Component {
  constructor(className: string, attributes: Items, onChange?: () => void) {
    super('input', className);
    this.addAttributes(attributes);
    if (onChange) this.setListener('input', onChange);
  }
}

export default Input;
