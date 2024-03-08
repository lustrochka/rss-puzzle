import Component from '../../basic-components/component';
import Label from '../../basic-components/label';
import Input from '../../basic-components/input';
import Button from '../../basic-components/button';
import { span } from '../../basic-components/tags';

function checkValidity(value: string, length: number) {
  if (!/[A-Z]/.test(value[0])) return 'Should start from uppercase';
  if (value.length < length) return `Should have at least ${length} characters`;
  if (!/^[a-zA-Z-]+$/.test(value)) return 'Only english letters and "-" are allowed';
  return '';
}

class LoginForm extends Component {
  nameInput;

  surnameInput;

  nameMsg;

  surnameMsg;

  constructor(onSubmit?: () => void) {
    super('form', 'login-form');
    this.nameMsg = span('login-form__message', '');
    this.surnameMsg = span('login-form__message', '');
    this.nameInput = new Input(
      'login-form__input',
      {
        id: 'first-name',
        type: 'text',
        required: 'true',
        pattern: '[A-Z]{1}[a-zA-Z\\-]{2,}',
      },
      () => {
        this.nameMsg.changeText(checkValidity((this.nameInput.getNode() as HTMLInputElement).value, 3));
      }
    );
    this.surnameInput = new Input(
      'login-form__input',
      {
        id: 'first-name',
        type: 'text',
        required: 'true',
        pattern: '[A-Z]{1}[a-zA-Z\\-]{2,}',
      },
      () => {
        this.surnameMsg.changeText(checkValidity((this.surnameInput.getNode() as HTMLInputElement).value, 4));
      }
    );
    super.appendChildren(
      new Label('login-form__label', 'First Name', { for: 'first-name' }),
      this.nameInput,
      this.nameMsg,
      new Label('login-form__label', 'Surname', { for: 'surname' }),
      this.surnameInput,
      this.surnameMsg,
      new Button('login-form__button', 'Login', { type: 'submit', disabled: 'true' }, 'submit', onSubmit)
    );
  }
}

export default LoginForm;
