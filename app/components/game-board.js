import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class GameBoardComponent extends Component {
  @tracked playerOneItem = null;
  @tracked playerTwoItem = null;
  @tracked roundEnded = false;
  @tracked winningPlayer = null;

  determineWinner() {
    const { playerOneItem, playerTwoItem } = this;

    if (
      (playerOneItem === 'rock' && playerTwoItem === 'scissors') ||
      (playerOneItem === 'paper' && playerTwoItem === 'rock') ||
      (playerOneItem === 'scissors' && playerTwoItem === 'paper')
    ) {
      this.winningPlayer = 1;
    } else if (
      (playerOneItem === 'scissors' && playerTwoItem === 'rock') ||
      (playerOneItem === 'rock' && playerTwoItem === 'paper') ||
      (playerOneItem === 'paper' && playerTwoItem === 'scissors')
    ) {
      this.winningPlayer = 2;
    } else {
      this.winningPlayer = null;
    }
  }

  @action
  newGame() {
    this.playerOneItem = null;
    this.playerTwoItem = null;
    this.roundEnded = false;
    this.winningPlayer = null;
  }

  @action
  itemChosen(player, item) {
    if (player === 1) {
      this.playerOneItem = item;
    } else {
      this.playerTwoItem = item;
    }

    if (this.playerOneItem && this.playerTwoItem) {
      this.determineWinner();

      later(
        this,
        function () {
          this.roundEnded = true;
        },
        500
      );
    }
  }
}
