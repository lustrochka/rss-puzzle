import Component from './component';
import { Items } from '../types';

class Option extends Component {
  constructor(className: string, attributes: Items, text: string) {
    super('option', className);
    this.changeText(text);
    this.addAttributes(attributes);
  }
}

export default Option;
