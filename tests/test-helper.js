import Application from 'rock-paper-scissors/app';
import config from 'rock-paper-scissors/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
