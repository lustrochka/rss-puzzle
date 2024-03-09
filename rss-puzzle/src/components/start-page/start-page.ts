import Component from '../../basic-components/component';
// import Button from '../../basic-components/button';
import { h1, p } from '../../basic-components/tags';

class StartPage extends Component {
  constructor() {
    super(
      'main',
      'start-page',
      h1('start-page__title', 'RSS-PUZZLE'),
      p(
        'start-page__description',
        `RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. 
        Players assemble sentences from jumbled words, inspired by Lingualeo's Phrase Constructor training. 
        The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.`
      )
    );
  }
}

export default StartPage;
