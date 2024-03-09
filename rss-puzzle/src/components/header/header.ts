import Component from '../../basic-components/component';
import Button from '../../basic-components/button';

class Header extends Component {
  constructor(onClick: () => void) {
    super('header', 'header');
    if (localStorage.length > 0) this.appendChildren(new Button('logout-button', 'Log out', {}, onClick));
  }
}

export default Header;
