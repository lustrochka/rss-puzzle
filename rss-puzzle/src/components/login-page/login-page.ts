import Component from '../../basic-components/component';
import LoginForm from './login-form';

class LoginPage extends Component {
  form;

  constructor() {
    super('div', 'app');
    this.form = new LoginForm(() => {
      const node = this.form.getNode();
      if (node instanceof HTMLFormElement) {
        const data = new FormData(node);
        localStorage.setItem('name', String(data.get('name')));
        localStorage.setItem('surname', String(data.get('surname')));
      }
    });
    super.appendChildren(this.form);
  }
}

export default LoginPage;
