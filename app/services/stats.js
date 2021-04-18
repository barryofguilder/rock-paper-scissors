import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ScoreService extends Service {
  @tracked playerOneScore = 0;
  @tracked playerTwoScore = 0;
  @tracked lastPlayerScored = null;
  @tracked lastPlayerScoreRun = 0;

  @action
  reset() {
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.lastPlayerScoreRun = null;
    this.lastPlayerScoreRun = 0;
  }

  @action
  incrementPlayerOneScore() {
    this.playerOneScore++;

    if (this.lastPlayerScored === 1) {
      this.lastPlayerScoreRun++;
    } else {
      this.lastPlayerScored = 1;
    }

    this.lastPlayerScored = 1;
  }
}
