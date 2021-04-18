import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class GameBoardComponent extends Component {
  @service stats;

  @tracked playerOneItem = null;
  @tracked playerTwoItem = null;
  @tracked roundEnded = false;
  @tracked winningPlayer = null;
  @tracked mode = 'choose';
  @tracked playerOneScore = 0;
  @tracked playerTwoScore = 0;

  determineWinner() {
    const { playerOneItem, playerTwoItem } = this;

    if (
      (playerOneItem === 'rock' && playerTwoItem === 'scissors') ||
      (playerOneItem === 'paper' && playerTwoItem === 'rock') ||
      (playerOneItem === 'scissors' && playerTwoItem === 'paper')
    ) {
      this.winningPlayer = 1;
      this.playerOneScore += 1;
    } else if (
      (playerOneItem === 'scissors' && playerTwoItem === 'rock') ||
      (playerOneItem === 'rock' && playerTwoItem === 'paper') ||
      (playerOneItem === 'paper' && playerTwoItem === 'scissors')
    ) {
      this.winningPlayer = 2;
      this.playerTwoScore += 1;
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
  resetScores() {
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
  }

  @action
  changeMode() {
    this.mode = this.mode === 'random' ? 'change' : 'random';
    this.roundEnded = false;
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
