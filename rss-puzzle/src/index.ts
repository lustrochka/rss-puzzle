import LoginPage from './components/login-page/login-page';
import './styles.scss'; // eslint-disable-line

const app = new LoginPage();
document.querySelector('body')?.appendChild(app.getNode());
