import Component from '../basic-components/component';
import LoginForm from './login-page/login-form';
import Header from './header/header';
import StartPage from './start-page/start-page';
import Game from './game-page/game';
import Results from './results/results';

class App extends Component {
  main;

  constructor() {
    super('div', 'app');
    this.main = new Component('main', 'main');
    this.render();
  }

  renderGame() {
    this.main.clear();
    this.main.appendChildren(new Game(() => this.renderResults()));
  }

  renderResults() {
    this.main.clear();
    this.main.appendChildren(new Results(() => this.renderGame()));
  }

  render() {
    this.clear();
    this.main.clear();
    const form = new LoginForm(() => {
      const data = new FormData(form.getNode());
      localStorage.setItem('name', String(data.get('name')));
      localStorage.setItem('surname', String(data.get('surname')));
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

window.addEventListener('unload', () => {
  localStorage.removeItem('phraseCount');
  localStorage.removeItem('autocompleted');
});

export default App;
