import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('repo');
  this.route('host');
  this.route('task', {path: '/'});
});

export default Router;
