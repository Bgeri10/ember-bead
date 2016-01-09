import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        
        var parameters = location.search.substring(1).split("&");
        var temp = parameters[0].split("=");
        var l = temp[1];
        
        
        return {
            CurrentMatch: this.store.findRecord('match', l),
            players: this.store.findAll('player')
        };
    }
});