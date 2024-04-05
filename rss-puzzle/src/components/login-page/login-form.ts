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

class LoginForm extends Component<HTMLFormElement> {
  #nameInput;

  #surnameInput;

  #nameMsg;

  #surnameMsg;

  #submitButton;

  constructor(onSubmit: () => void) {
    super('form', 'login-form');
    this.#nameMsg = span('login-form__message', '');
    this.#surnameMsg = span('login-form__message', '');
    this.#submitButton = new Button(
      'login-form__button button',
      'Login',
      { type: 'button', disabled: 'true' },
      onSubmit
    );
    this.#nameInput = new Input(
      'login-form__input',
      {
        id: 'first-name',
        type: 'text',
        name: 'name',
        required: 'true',
        pattern: '[A-Z]{1}[a-zA-Z\\-]{2,}',
        placeholder: 'John',
      },
      () => {
        this.#nameMsg.changeText(checkValidity(this.#nameInput.getValue(), 3));
        if (this.checkFormValidity()) {
          this.#submitButton.deleteAttribute('disabled');
        } else this.#submitButton.addAttributes({ disabled: 'true' });
      }
    );
    this.#surnameInput = new Input(
      'login-form__input',
      {
        id: 'first-name',
        type: 'text',
        name: 'surname',
        required: 'true',
        pattern: '[A-Z]{1}[a-zA-Z\\-]{3,}',
        placeholder: 'Doee',
      },
      () => {
        this.#surnameMsg.changeText(checkValidity(this.#surnameInput.getValue(), 4));
        if (this.checkFormValidity()) {
          this.#submitButton.deleteAttribute('disabled');
        } else this.#submitButton.addAttributes({ disabled: 'true' });
      }
    );
    super.appendChildren(
      new Label('login-form__label', 'First Name', { for: 'first-name' }),
      this.#nameInput,
      this.#nameMsg,
      new Label('login-form__label', 'Surname', { for: 'surname' }),
      this.#surnameInput,
      this.#surnameMsg,
      this.#submitButton
    );
    this.setListener('submit', (e: Event) => e.preventDefault());
  }

  checkFormValidity() {
    return this.getNode().checkValidity();
  }
}

export default LoginForm;
