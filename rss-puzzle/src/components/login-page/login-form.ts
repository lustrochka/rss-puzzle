import Component from '../../basic-components/component';
import Label from '../../basic-components/label';
import Input from '../../basic-components/input';
import Button from '../../basic-components/button';

class LoginForm extends Component {
  constructor(onSubmit?: () => void) {
    super(
      'form',
      'login-form',
      new Label('login-form__label', 'First Name', { for: 'first-name' }),
      new Input('login-form__input', { id: 'first-name', required: 'true' }),
      new Label('login-form__label', 'Surname', { for: 'surname' }),
      new Input('login-form__input', { id: 'surname', required: 'true' }),
      new Button('login-form__button', 'Login', { type: 'submit' }, 'submit', onSubmit)
    );
  }
}

export default LoginForm;
