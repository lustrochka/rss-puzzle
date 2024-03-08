import Component from './component';
import { Items } from '../types';

class Button extends Component {
  constructor(className: string, text: string, attributes: Items, event?: string, onEvent?: () => void) {
    super('button', className);
    this.addAttributes(attributes);
    this.changeText(text);
    if (event && onEvent) this.setListener(event, onEvent);
  }
}

export default Button;
