import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

const STARTING_INTERVAL = 300;
const REDUCE_INTERVAL = 50;
const MINIMUM_INTERVAL = 50;
const ROTATION_INTERVAL = 3;

const ITEMS = ['rock', 'paper', 'scissors'];

export default class ItemPickerComponent extends Component {
  @tracked interval = STARTING_INTERVAL;
  @tracked item = null;
  @tracked chosenItem = null;
  @tracked index = 0;
  @tracked counter = 0;

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
  iterateItem() {
    later(
      this,
      function () {
        this.changeItem();
      },
      this.interval
    );
  }

  @action
  chooseItem() {
    this.chosenItem = this.item;

    this.args.onChoose(this.args.player, this.chosenItem);
  }
}
