import LoginForm from './components/login-page/login-form';
import './styles.scss'; // eslint-disable-line

const form = new LoginForm();
document.querySelector('body')?.appendChild(form.getNode());
