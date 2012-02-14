(function() {
  var HomicideList, Victim, VictimList, templates;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  templates = {};

  templates.popup = Hogan.compile('<div class="datetime">\n<time datetime="{{ datetime }}">\n    {{ #datetime }}{{ #toString }}MMM. d yyyy, h:mm tt{{ /toString }}{{ /datetime }}\n</time>\n</div>\n<div class="victims">\n{{#victims}}\n    {{> victim }}\n{{/victims}}\n</victims>\n<div class="location">\n{{ address }}\n</div>');

  templates.victim = Hogan.compile('<div class="victim" id="v{{id}}">\n{{#profile_photo}}\n<img src="{{thumbnail}}" style="float:left; margin: 0 .5em .5em 0;"\nheight="75" width="75" class="profile_photo">\n{{/profile_photo}}\n<p><strong><a href="{{absolute_url}}">{{full_name}}</a></strong></p>\n</div>');

  this.Homicide = (function() {

    __extends(Homicide, Backbone.Model);

    function Homicide() {
      this.toString = __bind(this.toString, this);
      this.normalize = __bind(this.normalize, this);
      Homicide.__super__.constructor.apply(this, arguments);
    }

    Homicide.prototype.initialize = function(attributes, options) {
      this.victims = new VictimList(this.get('victims'));
      this.normalize();
      this.on('change', this.normalize);
      this.on('change:victims', function() {
        return this.victims = new VictimList(this.get('victims'));
      });
      return this;
    };

    Homicide.prototype.normalize = function() {
      var attr, changes, point, _i, _len, _ref;
      changes = {};
      _ref = ['datetime', 'created', 'modified'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        if (this.get(attr)) changes[attr] = Date.parse(this.get(attr));
      }
      point = this.get('point');
      if (point.coordinates) {
        changes.point = new L.LatLng(point.coordinates[1], point.coordinates[0]);
      }
      return this.set(changes);
    };

    Homicide.prototype.toString = function() {
      var names;
      if (this.victims) {
        names = this.victims.pluck('full_name');
        return _.compact(names).join(', ');
      } else {
        return "Homicide " + this.id;
      }
    };

    Homicide.prototype.url = function() {
      return this.get('resource_uri') || ("/api/v1/homicides/" + this.id + "/");
    };

    return Homicide;

  })();

  Victim = (function() {

    __extends(Victim, Backbone.Model);

    function Victim() {
      this.normalize = __bind(this.normalize, this);
      Victim.__super__.constructor.apply(this, arguments);
    }

    Victim.prototype.initialize = function(attributes) {
      this.on('change', this.normalize);
      this.view = new VictimInfoWindowView({
        model: this
      });
      return this;
    };

    Victim.prototype.normalize = function() {
      var attr, changes, _i, _len, _ref;
      changes = {};
      _ref = ['created', 'modified', 'dod', 'dob', 'incident_date'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        if (this.get(attr)) changes[attr] = Date.parse(this.get(attr));
      }
      return this.set(changes);
    };

    Victim.prototype.toString = function() {
      return this.get('full_name');
    };

    Victim.prototype.url = function() {
      return this.get('resource_uri' || ("/api/v1/victims/" + this.id));
    };

    return Victim;

  })();

  /*
  HomicideList handles all filtering methods related
  to homicide incidents.
  */

  HomicideList = (function() {

    __extends(HomicideList, Backbone.Collection);

    function HomicideList() {
      HomicideList.__super__.constructor.apply(this, arguments);
    }

    HomicideList.prototype.model = Homicide;

    HomicideList.prototype.parse = function(response) {
      return response.objects;
    };

    HomicideList.prototype.getVictims = function() {
      var victims;
      victims = this.map(function(homicide) {
        return homicide.victims;
      });
      return new VictimList(_.flatten(victims));
    };

    return HomicideList;

  })();

  VictimList = (function() {

    __extends(VictimList, Backbone.Collection);

    function VictimList() {
      VictimList.__super__.constructor.apply(this, arguments);
    }

    VictimList.prototype.model = Victim;

    VictimList.prototype.parse = function(response) {
      return response.objects;
    };

    return VictimList;

  })();

}).call(this);
