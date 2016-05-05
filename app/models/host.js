import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  url: DS.attr('string'),
  deployTo: DS.attr('string'),
  key: DS.attr('string'),
  user: DS.attr('string')
});
