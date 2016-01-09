import DS from 'ember-data';

var Player = DS.Model.extend({
  name: DS.attr('string'),
  img: DS.attr('string'),
  team: DS.attr('string'),
});

Player.reopenClass({
    FIXTURES: [
    {
        id: 1,
        name: 'Neymar',
        img: 'neymar',
        team: 'barca',
    },
    {
        id: 2,
        name: 'Higuain',
        img: 'higuain',
        team: 'napoli',
    },
    {
        id: 3,
        name: 'Muller',
        img: 'muller',
        team: 'bayern',
    },
    {
        id: 4,
        name: 'Bellerin',
        img: 'bellerin',
        team: 'arsenal',
    } 
  ]
});

export default Player;
