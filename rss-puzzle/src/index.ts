import LoginPage from './components/app';
import './styles.scss'; // eslint-disable-line

const app = new LoginPage();
document.querySelector('body')?.appendChild(app.getNode());
