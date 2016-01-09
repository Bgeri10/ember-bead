"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('matchhistory/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].JSONAPIAdapter.extend({
        host: 'https://af-ember-bead-api-bgeri10.c9users.io',
        namespace: ''
    });

});
define('matchhistory/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'matchhistory/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('matchhistory/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'matchhistory/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('matchhistory/components/edit-match-form', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend({
        actions: {
            onSubmit: function onSubmit(id) {
                this.get('onDel')(id);
                this.get('onSave')({
                    map: $('[name="map"]').val(),
                    type: $('[name="type"]').val(),
                    team1: [$('.team1 select:nth-of-type(1)').val(), $('.team1 select:nth-of-type(2)').val(), $('.team1 select:nth-of-type(3)').val(), $('.team1 select:nth-of-type(4)').val()],
                    team2: [$('.team2 select:nth-of-type(1)').val(), $('.team2 select:nth-of-type(2)').val(), $('.team2 select:nth-of-type(3)').val(), $('.team2 select:nth-of-type(4)').val()],
                    team1win: $('[name="victor"]').val() == 'true' ? true : false
                });
                //this.onSave();
                //window.history.back();
            }
        }
    });

});
define('matchhistory/components/match-form', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend({
        actions: {
            onSubmit: function onSubmit() {
                this.get('onSave')({
                    map: $('[name="map"]').val(),
                    type: $('[name="type"]').val(),
                    team1: [$('.team1 select:nth-of-type(1)').val(), $('.team1 select:nth-of-type(2)').val(), $('.team1 select:nth-of-type(3)').val(), $('.team1 select:nth-of-type(4)').val()],
                    team2: [$('.team2 select:nth-of-type(1)').val(), $('.team2 select:nth-of-type(2)').val(), $('.team2 select:nth-of-type(3)').val(), $('.team2 select:nth-of-type(4)').val()],
                    team1win: $('[name="victor"]').val() == 'true' ? true : false
                });
                //this.onSave();
                window.history.back();
            }
        }
    });

});
define('matchhistory/components/sc2-match', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend({
        tagName: 'div',
        classNames: ['match panel'],
        classNameBindings: ['current.team1win:panel-success:panel-danger'],
        actions: {
            onClick: function onClick(id) {
                this.get('onDel')(id);
            }
        }
    });

});
define('matchhistory/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('matchhistory/controllers/edit-match', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Controller.extend({
        actions: {
            deleteMatch: function deleteMatch(id) {
                this.store.findRecord('match', id).then(function (match) {
                    match.destroyRecord();
                });
            },
            editMatch: function editMatch(matchData) {
                console.log(matchData);
                var team1 = matchData.team1;
                var team2 = matchData.team2;
                delete matchData.team1;
                delete matchData.team2;
                var store = this.store;
                var match = this.store.createRecord('match', matchData);
                match.save().then(function () {
                    team1.forEach(function (player) {
                        if (player != null && player != 'null') {
                            //console.log(player);
                            store.findRecord('match', match.get('id')).then(function (_match) {
                                store.findRecord('player', player).then(function (_player) {
                                    _match.get('team1').pushObject(_player);
                                    _match.save();
                                });
                            });
                        }
                    });
                    console.log(match);
                    team2.forEach(function (player) {
                        if (player != null && player != 'null') {
                            //console.log(player);
                            store.findRecord('match', match.get('id')).then(function (_match) {
                                store.findRecord('player', player).then(function (_player) {
                                    _match.get('team2').pushObject(_player);
                                    _match.save();
                                });
                            });
                        }
                    });
                });
            }
        }
    });

});
define('matchhistory/controllers/history', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Controller.extend({
        actions: {
            // TODO: valahonnan legyen id
            deleteMatch: function deleteMatch(id) {
                this.store.findRecord('match', id).then(function (match) {
                    match.destroyRecord();
                });
            }
        }
    });

});
define('matchhistory/controllers/new-match', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Controller.extend({
        actions: {
            newMatch: function newMatch(matchData) {
                console.log(matchData);
                var team1 = matchData.team1;
                var team2 = matchData.team2;
                delete matchData.team1;
                delete matchData.team2;
                var store = this.store;
                var match = this.store.createRecord('match', matchData);
                match.save().then(function () {
                    team1.forEach(function (player) {
                        if (player != null && player != 'null') {
                            //console.log(player);
                            store.findRecord('match', match.get('id')).then(function (_match) {
                                store.findRecord('player', player).then(function (_player) {
                                    _match.get('team1').pushObject(_player);
                                    _match.save();
                                });
                            });
                        }
                    });
                    console.log(match);
                    team2.forEach(function (player) {
                        if (player != null && player != 'null') {
                            //console.log(player);
                            store.findRecord('match', match.get('id')).then(function (_match) {
                                store.findRecord('player', player).then(function (_player) {
                                    _match.get('team2').pushObject(_player);
                                    _match.save();
                                });
                            });
                        }
                    });
                });
            }
        }
    });

});
define('matchhistory/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('matchhistory/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'matchhistory/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('matchhistory/initializers/export-application-global', ['exports', 'ember', 'matchhistory/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('matchhistory/models/match', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    var Match = DS['default'].Model.extend({
        type: DS['default'].attr('string'),
        map: DS['default'].attr('string'),
        team1: DS['default'].hasMany('player', { async: true }),
        team2: DS['default'].hasMany('player', { async: true }),
        team1win: DS['default'].attr('boolean')
    });

    Match.reopenClass({
        FIXTURES: [{
            id: 1,
            type: '1v1',
            map: 'Bel\'shir vestige',
            team1: [1],
            team2: [2],
            team1win: true
        }, {
            id: 2,
            type: '1v1',
            map: 'Lost Temple',
            team1: [1],
            team2: [3],
            team1win: true
        }, {
            id: 3,
            type: '1v1',
            map: 'Korhal City',
            team1: [1],
            team2: [4],
            team1win: false
        }]
    });

    exports['default'] = Match;

});
define('matchhistory/models/player', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    var Player = DS['default'].Model.extend({
        name: DS['default'].attr('string'),
        img: DS['default'].attr('string'),
        team: DS['default'].attr('string')
    });

    Player.reopenClass({
        FIXTURES: [{
            id: 1,
            name: 'Neymar',
            img: 'neymar',
            team: 'barca'
        }, {
            id: 2,
            name: 'Higuain',
            img: 'higuain',
            team: 'napoli'
        }, {
            id: 3,
            name: 'Muller',
            img: 'muller',
            team: 'bayern'
        }, {
            id: 4,
            name: 'Bellerin',
            img: 'bellerin',
            team: 'arsenal'
        }]
    });

    exports['default'] = Player;

});
define('matchhistory/router', ['exports', 'ember', 'matchhistory/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('profile');
    this.route('history');
    this.route('new-match');
    this.route('edit-match');
  });

  exports['default'] = Router;

});
define('matchhistory/routes/edit-match', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function model() {

            var parameters = location.search.substring(1).split("&");
            var temp = parameters[0].split("=");
            var l = temp[1];

            return {
                CurrentMatch: this.store.findRecord('match', l),
                players: this.store.findAll('player')
            };
        }
    });

});
define('matchhistory/routes/history', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function model() {
            return {
                matches: this.store.findAll('match')
            };
        }
    });

});
define('matchhistory/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('matchhistory/routes/new-match', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function model() {
            return this.store.findAll('player');
        }
    });

});
define('matchhistory/routes/profile', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function model() {
            return {
                CurrentPlayer: this.store.findRecord('player', 'vxLPSnWjPZt3xh1OX5Bq')
            };
        }
    });

});
define('matchhistory/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 12
            },
            "end": {
              "line": 6,
              "column": 40
            }
          },
          "moduleName": "matchhistory/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Kezdőlap");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 12
            },
            "end": {
              "line": 7,
              "column": 41
            }
          },
          "moduleName": "matchhistory/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Játékos");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 12
            },
            "end": {
              "line": 8,
              "column": 44
            }
          },
          "moduleName": "matchhistory/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Mérkőzések");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 6
          }
        },
        "moduleName": "matchhistory/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"class","logo");
        dom.setAttribute(el3,"href","#");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","/assets/images/logo.png");
        dom.setAttribute(el4,"alt","Logo");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  \n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","nav nav-pills");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row well");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [5]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["index"],[],0,null,["loc",[null,[6,12],[6,52]]]],
        ["block","link-to",["profile"],[],1,null,["loc",[null,[7,12],[7,53]]]],
        ["block","link-to",["history"],[],2,null,["loc",[null,[8,12],[8,56]]]],
        ["content","outlet",["loc",[null,[13,6],[13,16]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('matchhistory/templates/components/edit-match-form', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 16
            },
            "end": {
              "line": 17,
              "column": 16
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          dom.setAttribute(el1,"value","true");
          var el2 = dom.createTextNode("Hazai csapat");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          dom.setAttribute(el1,"value","false");
          var el2 = dom.createTextNode("Vendég csapat");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 16
            },
            "end": {
              "line": 20,
              "column": 16
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          dom.setAttribute(el1,"value","true");
          var el2 = dom.createTextNode("Vendég csapat");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          dom.setAttribute(el1,"value","false");
          var el2 = dom.createTextNode("Hazai csapat");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 20
            },
            "end": {
              "line": 32,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element7 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element7, 'value');
          morphs[1] = dom.createMorphAt(element7,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[31,37],[31,46]]]]]]],
          ["content","player.name",["loc",[null,[31,50],[31,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 20
            },
            "end": {
              "line": 39,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element6 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element6, 'value');
          morphs[1] = dom.createMorphAt(element6,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[38,37],[38,46]]]]]]],
          ["content","player.name",["loc",[null,[38,50],[38,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 44,
              "column": 20
            },
            "end": {
              "line": 46,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element5 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element5, 'value');
          morphs[1] = dom.createMorphAt(element5,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[45,37],[45,46]]]]]]],
          ["content","player.name",["loc",[null,[45,50],[45,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child5 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 51,
              "column": 20
            },
            "end": {
              "line": 53,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element4, 'value');
          morphs[1] = dom.createMorphAt(element4,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[52,37],[52,46]]]]]]],
          ["content","player.name",["loc",[null,[52,50],[52,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child6 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 63,
              "column": 20
            },
            "end": {
              "line": 65,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element3, 'value');
          morphs[1] = dom.createMorphAt(element3,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[64,37],[64,46]]]]]]],
          ["content","player.name",["loc",[null,[64,50],[64,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child7 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 70,
              "column": 20
            },
            "end": {
              "line": 72,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element2, 'value');
          morphs[1] = dom.createMorphAt(element2,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[71,37],[71,46]]]]]]],
          ["content","player.name",["loc",[null,[71,50],[71,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child8 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 77,
              "column": 20
            },
            "end": {
              "line": 79,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element1, 'value');
          morphs[1] = dom.createMorphAt(element1,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[78,37],[78,46]]]]]]],
          ["content","player.name",["loc",[null,[78,50],[78,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child9 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 84,
              "column": 20
            },
            "end": {
              "line": 86,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'value');
          morphs[1] = dom.createMorphAt(element0,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[85,37],[85,46]]]]]]],
          ["content","player.name",["loc",[null,[85,50],[85,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 94,
            "column": 7
          }
        },
        "moduleName": "matchhistory/templates/components/edit-match-form.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","form-horizontal");
        dom.setAttribute(el1,"method","post");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-12");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","map");
        var el5 = dom.createTextNode("Stadion");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4,"type","text");
        dom.setAttribute(el4,"class","form-control");
        dom.setAttribute(el4,"name","map");
        dom.setAttribute(el4,"required","required");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-12");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","type");
        var el5 = dom.createTextNode("Játékosok száma");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4,"type","text");
        dom.setAttribute(el4,"class","form-control");
        dom.setAttribute(el4,"name","type");
        dom.setAttribute(el4,"required","required");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-12");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","victor");
        var el5 = dom.createTextNode("Nyertes");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("select");
        dom.setAttribute(el4,"class","form-control");
        dom.setAttribute(el4,"name","victor");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("                \n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-6");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","team1_1");
        dom.setAttribute(el4,"class","col-lg-2 control-label");
        var el5 = dom.createTextNode("Hazaiak");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","team1");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team1_1");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team1_2");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team1_3");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team1_4");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-6");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","team2_1");
        dom.setAttribute(el4,"class","col-lg-2 control-label");
        var el5 = dom.createTextNode("Vendégek");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","team2");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team2_1");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team2_2");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team2_3");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team2_4");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","btn btn-primary");
        var el5 = dom.createTextNode("Hozzáadás");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element8 = dom.childAt(fragment, [0, 1]);
        var element9 = dom.childAt(element8, [1, 3]);
        var element10 = dom.childAt(element8, [3, 3]);
        var element11 = dom.childAt(element8, [7, 6]);
        var element12 = dom.childAt(element8, [9, 6]);
        var element13 = dom.childAt(element8, [11, 1]);
        var morphs = new Array(12);
        morphs[0] = dom.createAttrMorph(element9, 'value');
        morphs[1] = dom.createAttrMorph(element10, 'value');
        morphs[2] = dom.createMorphAt(dom.childAt(element8, [5, 3]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element11, [1]),3,3);
        morphs[4] = dom.createMorphAt(dom.childAt(element11, [5]),3,3);
        morphs[5] = dom.createMorphAt(dom.childAt(element11, [9]),3,3);
        morphs[6] = dom.createMorphAt(dom.childAt(element11, [13]),3,3);
        morphs[7] = dom.createMorphAt(dom.childAt(element12, [1]),3,3);
        morphs[8] = dom.createMorphAt(dom.childAt(element12, [5]),3,3);
        morphs[9] = dom.createMorphAt(dom.childAt(element12, [9]),3,3);
        morphs[10] = dom.createMorphAt(dom.childAt(element12, [13]),3,3);
        morphs[11] = dom.createElementMorph(element13);
        return morphs;
      },
      statements: [
        ["attribute","value",["concat",[["get","CurrentMatch.map",["loc",[null,[5,72],[5,88]]]]]]],
        ["attribute","value",["concat",[["get","CurrentMatch.type",["loc",[null,[9,74],[9,91]]]]]]],
        ["block","if",[["get","CurrentMatch.team1win",["loc",[null,[14,22],[14,43]]]]],[],0,1,["loc",[null,[14,16],[20,23]]]],
        ["block","each",[["get","players",["loc",[null,[30,28],[30,35]]]]],[],2,null,["loc",[null,[30,20],[32,29]]]],
        ["block","each",[["get","players",["loc",[null,[37,28],[37,35]]]]],[],3,null,["loc",[null,[37,20],[39,29]]]],
        ["block","each",[["get","players",["loc",[null,[44,28],[44,35]]]]],[],4,null,["loc",[null,[44,20],[46,29]]]],
        ["block","each",[["get","players",["loc",[null,[51,28],[51,35]]]]],[],5,null,["loc",[null,[51,20],[53,29]]]],
        ["block","each",[["get","players",["loc",[null,[63,28],[63,35]]]]],[],6,null,["loc",[null,[63,20],[65,29]]]],
        ["block","each",[["get","players",["loc",[null,[70,28],[70,35]]]]],[],7,null,["loc",[null,[70,20],[72,29]]]],
        ["block","each",[["get","players",["loc",[null,[77,28],[77,35]]]]],[],8,null,["loc",[null,[77,20],[79,29]]]],
        ["block","each",[["get","players",["loc",[null,[84,28],[84,35]]]]],[],9,null,["loc",[null,[84,20],[86,29]]]],
        ["element","action",["onSubmit",["get","CurrentMatch.id",["loc",[null,[91,40],[91,55]]]]],[],["loc",[null,[91,20],[91,57]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9]
    };
  }()));

});
define('matchhistory/templates/components/match-form', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 20
            },
            "end": {
              "line": 25,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element7 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element7, 'value');
          morphs[1] = dom.createMorphAt(element7,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[24,37],[24,46]]]]]]],
          ["content","player.name",["loc",[null,[24,50],[24,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 20
            },
            "end": {
              "line": 32,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element6 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element6, 'value');
          morphs[1] = dom.createMorphAt(element6,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[31,37],[31,46]]]]]]],
          ["content","player.name",["loc",[null,[31,50],[31,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 20
            },
            "end": {
              "line": 39,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element5 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element5, 'value');
          morphs[1] = dom.createMorphAt(element5,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[38,37],[38,46]]]]]]],
          ["content","player.name",["loc",[null,[38,50],[38,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 44,
              "column": 20
            },
            "end": {
              "line": 46,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element4, 'value');
          morphs[1] = dom.createMorphAt(element4,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[45,37],[45,46]]]]]]],
          ["content","player.name",["loc",[null,[45,50],[45,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 55,
              "column": 20
            },
            "end": {
              "line": 57,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element3, 'value');
          morphs[1] = dom.createMorphAt(element3,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[56,37],[56,46]]]]]]],
          ["content","player.name",["loc",[null,[56,50],[56,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child5 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 62,
              "column": 20
            },
            "end": {
              "line": 64,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element2, 'value');
          morphs[1] = dom.createMorphAt(element2,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[63,37],[63,46]]]]]]],
          ["content","player.name",["loc",[null,[63,50],[63,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child6 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 69,
              "column": 20
            },
            "end": {
              "line": 71,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element1, 'value');
          morphs[1] = dom.createMorphAt(element1,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[70,37],[70,46]]]]]]],
          ["content","player.name",["loc",[null,[70,50],[70,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child7 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 76,
              "column": 20
            },
            "end": {
              "line": 78,
              "column": 20
            }
          },
          "moduleName": "matchhistory/templates/components/match-form.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'value');
          morphs[1] = dom.createMorphAt(element0,0,0);
          return morphs;
        },
        statements: [
          ["attribute","value",["concat",[["get","player.id",["loc",[null,[77,37],[77,46]]]]]]],
          ["content","player.name",["loc",[null,[77,50],[77,65]]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 86,
            "column": 7
          }
        },
        "moduleName": "matchhistory/templates/components/match-form.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","form-horizontal");
        dom.setAttribute(el1,"method","post");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-12");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","map");
        var el5 = dom.createTextNode("Stadion");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4,"type","text");
        dom.setAttribute(el4,"class","form-control");
        dom.setAttribute(el4,"name","map");
        dom.setAttribute(el4,"placeholder","Nou Camp");
        dom.setAttribute(el4,"required","required");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-12");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","type");
        var el5 = dom.createTextNode("Játékosok száma");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4,"type","text");
        dom.setAttribute(el4,"class","form-control");
        dom.setAttribute(el4,"name","type");
        dom.setAttribute(el4,"placeholder","1v1");
        dom.setAttribute(el4,"required","required");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-12");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","victor");
        var el5 = dom.createTextNode("Nyertes");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("select");
        dom.setAttribute(el4,"class","form-control");
        dom.setAttribute(el4,"name","victor");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("option");
        dom.setAttribute(el5,"value","true");
        var el6 = dom.createTextNode("Hazai csapat");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("option");
        dom.setAttribute(el5,"value","false");
        var el6 = dom.createTextNode("Vendég csapat");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-6");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","team1_1");
        dom.setAttribute(el4,"class","col-lg-2 control-label");
        var el5 = dom.createTextNode("Hazaiak");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","team1");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team1_1");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team1_2");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team1_3");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team1_4");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group col-sm-6");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","team2_1");
        dom.setAttribute(el4,"class","col-lg-2 control-label");
        var el5 = dom.createTextNode("Vendégek");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","team2");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team2_1");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team2_2");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team2_3");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5,"class","form-control");
        dom.setAttribute(el5,"name","team2_4");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6,"value","null");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","form-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","btn btn-primary");
        var el5 = dom.createTextNode("Hozzáadás");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element8 = dom.childAt(fragment, [0, 1]);
        var element9 = dom.childAt(element8, [7, 6]);
        var element10 = dom.childAt(element8, [9, 6]);
        var element11 = dom.childAt(element8, [11, 1]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element9, [1]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element9, [5]),3,3);
        morphs[2] = dom.createMorphAt(dom.childAt(element9, [9]),3,3);
        morphs[3] = dom.createMorphAt(dom.childAt(element9, [13]),3,3);
        morphs[4] = dom.createMorphAt(dom.childAt(element10, [1]),1,1);
        morphs[5] = dom.createMorphAt(dom.childAt(element10, [5]),3,3);
        morphs[6] = dom.createMorphAt(dom.childAt(element10, [9]),3,3);
        morphs[7] = dom.createMorphAt(dom.childAt(element10, [13]),3,3);
        morphs[8] = dom.createElementMorph(element11);
        return morphs;
      },
      statements: [
        ["block","each",[["get","players",["loc",[null,[23,28],[23,35]]]]],[],0,null,["loc",[null,[23,20],[25,29]]]],
        ["block","each",[["get","players",["loc",[null,[30,28],[30,35]]]]],[],1,null,["loc",[null,[30,20],[32,29]]]],
        ["block","each",[["get","players",["loc",[null,[37,28],[37,35]]]]],[],2,null,["loc",[null,[37,20],[39,29]]]],
        ["block","each",[["get","players",["loc",[null,[44,28],[44,35]]]]],[],3,null,["loc",[null,[44,20],[46,29]]]],
        ["block","each",[["get","players",["loc",[null,[55,28],[55,35]]]]],[],4,null,["loc",[null,[55,20],[57,29]]]],
        ["block","each",[["get","players",["loc",[null,[62,28],[62,35]]]]],[],5,null,["loc",[null,[62,20],[64,29]]]],
        ["block","each",[["get","players",["loc",[null,[69,28],[69,35]]]]],[],6,null,["loc",[null,[69,20],[71,29]]]],
        ["block","each",[["get","players",["loc",[null,[76,28],[76,35]]]]],[],7,null,["loc",[null,[76,20],[78,29]]]],
        ["element","action",["onSubmit"],[],["loc",[null,[83,20],[83,41]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6, child7]
    };
  }()));

});
define('matchhistory/templates/components/sc2-match', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 8
            },
            "end": {
              "line": 8,
              "column": 8
            }
          },
          "moduleName": "matchhistory/templates/components/sc2-match.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h2");
          dom.setAttribute(el1,"class","text-success");
          var el2 = dom.createTextNode("Hazai győzelem");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 8
            },
            "end": {
              "line": 10,
              "column": 8
            }
          },
          "moduleName": "matchhistory/templates/components/sc2-match.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h2");
          dom.setAttribute(el1,"class","text-danger");
          var el2 = dom.createTextNode("Vendég győzelem");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 12
            },
            "end": {
              "line": 22,
              "column": 12
            }
          },
          "moduleName": "matchhistory/templates/components/sc2-match.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","left");
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h2");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2,"alt","profile");
          dom.setAttribute(el2,"class","pull-left");
          dom.setAttribute(el2,"width","100");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var element4 = dom.childAt(element3, [3]);
          var element5 = dom.childAt(element3, [5]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[1] = dom.createAttrMorph(element4, 'alt');
          morphs[2] = dom.createAttrMorph(element4, 'class');
          morphs[3] = dom.createAttrMorph(element5, 'src');
          return morphs;
        },
        statements: [
          ["content","player.name",["loc",[null,[17,24],[17,39]]]],
          ["attribute","alt",["concat",[["get","player.team",["loc",[null,[18,32],[18,43]]]]]]],
          ["attribute","class",["concat",[["get","player.team",["loc",[null,[18,56],[18,67]]]]," small ach1"]]],
          ["attribute","src",["concat",["assets/images/",["get","player.img",["loc",[null,[19,46],[19,56]]]],".png"]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 12
            },
            "end": {
              "line": 36,
              "column": 12
            }
          },
          "moduleName": "matchhistory/templates/components/sc2-match.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","left");
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h2");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2,"alt","profile");
          dom.setAttribute(el2,"class","pull-left");
          dom.setAttribute(el2,"width","100");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [3]);
          var element2 = dom.childAt(element0, [5]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          morphs[1] = dom.createAttrMorph(element1, 'alt');
          morphs[2] = dom.createAttrMorph(element1, 'class');
          morphs[3] = dom.createAttrMorph(element2, 'src');
          return morphs;
        },
        statements: [
          ["content","player.name",["loc",[null,[31,24],[31,39]]]],
          ["attribute","alt",["concat",[["get","player.team",["loc",[null,[32,32],[32,43]]]]]]],
          ["attribute","class",["concat",[["get","player.team",["loc",[null,[32,56],[32,67]]]]," small ach1"]]],
          ["attribute","src",["concat",["assets/images/",["get","player.img",["loc",[null,[33,46],[33,56]]]],".png"]]]
        ],
        locals: ["player"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 43,
            "column": 0
          }
        },
        "moduleName": "matchhistory/templates/components/sc2-match.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-md-12");
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-md-6 auto");
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container-fluid team1");
        var el3 = dom.createTextNode("\n            ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","row");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("            ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-md-6 auto right");
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container-fluid team2");
        var el3 = dom.createTextNode("\n            ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","row");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("            ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","edit");
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","glyphicon glyphicon-pencil");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","delete");
        var el2 = dom.createTextNode("×");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element6 = dom.childAt(fragment, [1]);
        var element7 = dom.childAt(fragment, [7]);
        var element8 = dom.childAt(fragment, [9]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(dom.childAt(element6, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element6, [5]),0,0);
        morphs[2] = dom.createMorphAt(element6,9,9);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [3, 1, 1]),1,1);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [5, 1, 1]),1,1);
        morphs[5] = dom.createAttrMorph(element7, 'href');
        morphs[6] = dom.createElementMorph(element8);
        return morphs;
      },
      statements: [
        ["content","current.type",["loc",[null,[2,16],[2,32]]]],
        ["content","current.map",["loc",[null,[4,12],[4,27]]]],
        ["block","if",[["get","current.team1win",["loc",[null,[6,14],[6,30]]]]],[],0,1,["loc",[null,[6,8],[10,15]]]],
        ["block","each",[["get","current.team1",["loc",[null,[15,20],[15,33]]]]],[],2,null,["loc",[null,[15,12],[22,21]]]],
        ["block","each",[["get","current.team2",["loc",[null,[29,20],[29,33]]]]],[],3,null,["loc",[null,[29,12],[36,21]]]],
        ["attribute","href",["concat",["/edit-match?id=",["get","current.id",["loc",[null,[41,30],[41,40]]]]]]],
        ["element","action",["onClick",["get","current.id",["loc",[null,[42,43],[42,53]]]]],[],["loc",[null,[42,24],[42,55]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('matchhistory/templates/edit-match', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 10
          }
        },
        "moduleName": "matchhistory/templates/edit-match.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Mérkőzés módosítása");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","edit-match-form",[],["players",["subexpr","@mut",[["get","model.players",["loc",[null,[3,26],[3,39]]]]],[],[]],"CurrentMatch",["subexpr","@mut",[["get","model.CurrentMatch",["loc",[null,[3,53],[3,71]]]]],[],[]],"onSave",["subexpr","action",["editMatch"],[],["loc",[null,[3,79],[3,99]]]],"onDel",["subexpr","action",["deleteMatch"],[],["loc",[null,[3,106],[3,128]]]]],["loc",[null,[3,0],[3,130]]]],
        ["content","outlet",["loc",[null,[5,0],[5,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('matchhistory/templates/history', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 4
            },
            "end": {
              "line": 4,
              "column": 4
            }
          },
          "moduleName": "matchhistory/templates/history.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","sc2-match",[],["current",["subexpr","@mut",[["get","match",["loc",[null,[3,28],[3,33]]]]],[],[]],"CurrentPlayer",["subexpr","@mut",[["get","model.CurrentPlayer",["loc",[null,[3,48],[3,67]]]]],[],[]],"onDel",["subexpr","action",["deleteMatch"],[],["loc",[null,[3,74],[3,96]]]]],["loc",[null,[3,8],[3,98]]]]
        ],
        locals: ["match"],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 4
            },
            "end": {
              "line": 12,
              "column": 4
            }
          },
          "moduleName": "matchhistory/templates/history.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-info pull-left");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"class","glyphicon glyphicon-plus");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          \n        Új mérkőzés\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "matchhistory/templates/history.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container auto");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0,1,1);
        morphs[1] = dom.createMorphAt(element0,3,3);
        morphs[2] = dom.createMorphAt(element0,5,5);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model.matches",["loc",[null,[2,12],[2,25]]]]],[],0,null,["loc",[null,[2,4],[4,13]]]],
        ["content","outlet",["loc",[null,[5,4],[5,14]]]],
        ["block","link-to",["new-match"],[],1,null,["loc",[null,[6,4],[12,16]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('matchhistory/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "matchhistory/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Fifa 16 meccsek");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Fifa 16 Ultimate Team-es karakterek meccseit tartalmazó oldal!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[4,0],[4,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('matchhistory/templates/new-match', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "matchhistory/templates/new-match.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Új mérkőzés");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","match-form",[],["players",["subexpr","@mut",[["get","model",["loc",[null,[3,21],[3,26]]]]],[],[]],"onSave",["subexpr","action",["newMatch"],[],["loc",[null,[3,34],[3,53]]]]],["loc",[null,[3,0],[3,55]]]],
        ["content","outlet",["loc",[null,[5,0],[5,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('matchhistory/templates/profile', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "matchhistory/templates/profile.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("img");
        dom.setAttribute(el1,"alt","profile");
        dom.setAttribute(el1,"class","avatar pull-left");
        dom.setAttribute(el1,"width","200");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h1");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","league medium ach1");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2,"width","100");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [6, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element0, 'src');
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
        morphs[2] = dom.createAttrMorph(element1, 'src');
        morphs[3] = dom.createAttrMorph(element1, 'alt');
        morphs[4] = dom.createMorphAt(fragment,8,8,contextualElement);
        return morphs;
      },
      statements: [
        ["attribute","src",["concat",["assets/images/",["get","model.CurrentPlayer.img",["loc",[null,[1,26],[1,49]]]],".png"]]],
        ["content","model.CurrentPlayer.name",["loc",[null,[4,4],[4,32]]]],
        ["attribute","src",["concat",["assets/images/",["get","model.CurrentPlayer.team",["loc",[null,[7,30],[7,54]]]],".png"]]],
        ["attribute","alt",["concat",[["get","model.CurrentPlayer.team",["loc",[null,[8,12],[8,36]]]]]]],
        ["content","outlet",["loc",[null,[11,0],[11,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('matchhistory/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function(assert) { 
    assert.ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nadapters/application.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 3, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 4, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 18, col 1, \'export\' is only available in ES6 (use esnext option).\n\n5 errors'); 
  });

});
define('matchhistory/tests/components/edit-match-form.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/edit-match-form.js should pass jshint', function(assert) { 
    assert.ok(false, 'components/edit-match-form.js should pass jshint.\ncomponents/edit-match-form.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncomponents/edit-match-form.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/components/match-form.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/match-form.js should pass jshint', function(assert) { 
    assert.ok(false, 'components/match-form.js should pass jshint.\ncomponents/match-form.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncomponents/match-form.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/components/sc2-match.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/sc2-match.js should pass jshint', function(assert) { 
    assert.ok(false, 'components/sc2-match.js should pass jshint.\ncomponents/sc2-match.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncomponents/sc2-match.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/controllers/edit-match.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/edit-match.js should pass jshint', function(assert) { 
    assert.ok(false, 'controllers/edit-match.js should pass jshint.\ncontrollers/edit-match.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/edit-match.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\ncontrollers/edit-match.js: line 20, col 32, Use \'!==\' to compare with \'null\'.\ncontrollers/edit-match.js: line 34, col 32, Use \'!==\' to compare with \'null\'.\n\n4 errors'); 
  });

});
define('matchhistory/tests/controllers/history.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/history.js should pass jshint', function(assert) { 
    assert.ok(false, 'controllers/history.js should pass jshint.\ncontrollers/history.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/history.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/controllers/new-match.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/new-match.js should pass jshint', function(assert) { 
    assert.ok(false, 'controllers/new-match.js should pass jshint.\ncontrollers/new-match.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/new-match.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\ncontrollers/new-match.js: line 15, col 32, Use \'!==\' to compare with \'null\'.\ncontrollers/new-match.js: line 29, col 32, Use \'!==\' to compare with \'null\'.\n\n4 errors'); 
  });

});
define('matchhistory/tests/helpers/resolver', ['exports', 'ember/resolver', 'matchhistory/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('matchhistory/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('matchhistory/tests/helpers/start-app', ['exports', 'ember', 'matchhistory/app', 'matchhistory/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('matchhistory/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('matchhistory/tests/integration/components/match-form-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('match-form', 'Integration | Component | match form', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 14
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'match-form', ['loc', [null, [1, 0], [1, 14]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'match-form', [], [], 0, null, ['loc', [null, [2, 4], [4, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('matchhistory/tests/integration/components/match-form-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/match-form-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/match-form-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/integration/components/sc2-match-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('sc2-match', 'Integration | Component | sc2 match', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'sc2-match', ['loc', [null, [1, 0], [1, 13]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'sc2-match', [], [], 0, null, ['loc', [null, [2, 4], [4, 18]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('matchhistory/tests/integration/components/sc2-match-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/sc2-match-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/sc2-match-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/models/match.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/match.js should pass jshint', function(assert) { 
    assert.ok(false, 'models/match.js should pass jshint.\nmodels/match.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/match.js: line 40, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/models/player.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/player.js should pass jshint', function(assert) { 
    assert.ok(false, 'models/player.js should pass jshint.\nmodels/player.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/player.js: line 38, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 15, col 1, \'export\' is only available in ES6 (use esnext option).\n\n3 errors'); 
  });

});
define('matchhistory/tests/routes/edit-match.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/edit-match.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/edit-match.js should pass jshint.\nroutes/edit-match.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/edit-match.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/routes/history.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/history.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/history.js should pass jshint.\nroutes/history.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/history.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/routes/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/index.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/routes/new-match.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/new-match.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/new-match.js should pass jshint.\nroutes/new-match.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/new-match.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/routes/profile.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/profile.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/profile.js should pass jshint.\nroutes/profile.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/profile.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors'); 
  });

});
define('matchhistory/tests/test-helper', ['matchhistory/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('matchhistory/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('matchhistory/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
define('matchhistory/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/application-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/unit/controllers/history-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('matchhistory/tests/unit/controllers/history-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/history-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/controllers/history-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/unit/controllers/new-match-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:new-match', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('matchhistory/tests/unit/controllers/new-match-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/new-match-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/controllers/new-match-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/unit/models/match-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('match', 'Unit | Model | match', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('matchhistory/tests/unit/models/match-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/match-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/models/match-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/unit/models/player-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('player', 'Unit | Model | player', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('matchhistory/tests/unit/models/player-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/player-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/models/player-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/unit/routes/history-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:history', 'Unit | Route | history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('matchhistory/tests/unit/routes/history-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/history-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/history-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('matchhistory/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/index-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/unit/routes/new-match-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:new-match', 'Unit | Route | new match', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('matchhistory/tests/unit/routes/new-match-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/new-match-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/new-match-test.js should pass jshint.'); 
  });

});
define('matchhistory/tests/unit/routes/profile-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:profile', 'Unit | Route | profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('matchhistory/tests/unit/routes/profile-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/profile-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/profile-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('matchhistory/config/environment', ['ember'], function(Ember) {
  var prefix = 'matchhistory';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("matchhistory/tests/test-helper");
} else {
  require("matchhistory/app")["default"].create({"name":"matchhistory","version":"0.0.0+8430b019"});
}

/* jshint ignore:end */
//# sourceMappingURL=matchhistory.map