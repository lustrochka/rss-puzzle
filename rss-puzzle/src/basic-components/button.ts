import Component from './component';
import { Items } from '../types';

class Button extends Component {
  constructor(className: string, text: string, attributes: Items, onEvent?: () => void) {
    super('button', className);
    this.addAttributes(attributes);
    this.changeText(text);
    if (onEvent) this.setListener('click', onEvent);
  }
}

export default Button;
