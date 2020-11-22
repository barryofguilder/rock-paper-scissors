import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

const STARTING_INTERVAL = 300;
const REDUCE_INTERVAL = 50;
const MINIMUM_INTERVAL = 50;
const ROTATION_INTERVAL = 3;

const ITEMS = ['rock', 'paper', 'scissors'];

class Player {
  @tracked playerNumber;
  @tracked mode;
  @tracked randomKey;
  @tracked rockKey;
  @tracked paperKey;
  @tracked scissorKey;

  constructor(playerNumber, mode) {
    this.playerNumber = playerNumber;
    this.mode = mode;

    if (this.mode === 'random') {
      this.randomKey = this.playerNumber === 1 ? 'Space' : 'Enter';
    } else {
      this.rockKey = this.playerNumber === 1 ? 'a' : 'h';
      this.paperKey = this.playerNumber === 1 ? 's' : 'j';
      this.scissorKey = this.playerNumber === 1 ? 'd' : 'k';
    }
  }
}

export default class ItemPickerComponent extends Component {
  @tracked interval = STARTING_INTERVAL;
  @tracked item = null;
  @tracked chosenItem = null;
  @tracked index = 0;
  @tracked counter = 0;
  @tracked player;

  resetItem() {
    this.item = null;
    this.chosenItem = null;
    this.interval = STARTING_INTERVAL;
    this.index = 0;
    this.counter = 0;
  }

  changeItem() {
    if (this.chosenItem) {
      return;
    }

    this.item = ITEMS[this.index];

    this.index++;
    this.counter++;

    if (this.index === ITEMS.length) {
      this.index = 0;
    }

    if (this.counter % ROTATION_INTERVAL === 0) {
      this.interval -= REDUCE_INTERVAL;

      if (this.interval <= MINIMUM_INTERVAL) {
        this.interval = MINIMUM_INTERVAL;
      }
    }

    this.iterateItem();
  }

  @action
  setupAndStart() {
    this.player = new Player(this.args.player, this.args.mode);

    if (this.args.mode === 'random') {
      later(
        this,
        function () {
          this.changeItem();
        },
        this.interval
      );
    }
  }

  @action
  chooseItem() {
    if (this.args.mode === 'random') {
      this.chosenItem = this.item;
      this.args.onChoose(this.args.player, this.chosenItem);
    }
  }

  @action
  chooseRock() {
    if (this.args.mode === 'choose') {
      this.chosenItem = 'rock';
      this.args.onChoose(this.args.player, this.chosenItem);
    }
  }

  @action
  choosePaper() {
    if (this.args.mode === 'choose') {
      this.chosenItem = 'paper';
      this.args.onChoose(this.args.player, this.chosenItem);
    }
  }

  @action
  chooseScissor() {
    if (this.args.mode === 'choose') {
      this.chosenItem = 'scissors';
      this.args.onChoose(this.args.player, this.chosenItem);
    }
  }
}
