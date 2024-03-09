import Component from '../basic-components/component';
import LoginForm from './login-page/login-form';
import Header from './header/header';
import StartPage from './start-page/start-page';

class App extends Component {
  constructor() {
    super('div', 'app');
    this.render();
  }

  render() {
    console.log('render');
    this.getNode().innerHTML = '';
    const form = new LoginForm(() => {
      const node = form.getNode();
      if (node instanceof HTMLFormElement) {
        const data = new FormData(node);
        localStorage.setItem('name', String(data.get('name')));
        localStorage.setItem('surname', String(data.get('surname')));
      }
      this.render();
    });
    const header = new Header(() => {
      localStorage.clear();
      this.render();
    });
    this.appendChildren(header);
    if (localStorage.length === 0) {
      this.appendChildren(form);
    } else {
      this.appendChildren(new StartPage());
    }
  }
}

export default App;
