import Component from '../basic-components/component';
import LoginForm from './login-page/login-form';
import Header from './header/header';
import StartPage from './start-page/start-page';
import Game from './game-page/game';

class App extends Component {
  main = new Component('main', 'main');

  constructor() {
    super('div', 'app');
    this.main = new Component('main', 'main');
    this.render();
  }

  renderGame() {
    console.group(this);
    console.log(this.main);
    this.main.getNode().innerHTML = '';
    this.main.appendChildren(new Game());
  }

  render() {
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
    this.appendChildren(this.main);
    if (localStorage.length === 0) {
      this.main.appendChildren(form);
    } else {
      this.main.appendChildren(new StartPage(() => this.renderGame()));
    }
  }
}

export default App;
