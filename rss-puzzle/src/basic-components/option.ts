import Component from './component';
import { Items } from '../types';

class Option extends Component {
  constructor(className: string, atttributes: Items, text: string) {
    super('option', className);
    this.changeText(text);
    this.addAttributes(atttributes);
  }
}

export default Option;
