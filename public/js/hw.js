(function() {
  var Homicide,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Homicide = (function(_super) {

    __extends(Homicide, _super);

    function Homicide() {
      Homicide.__super__.constructor.apply(this, arguments);
    }

    Homicide.prototype.initialize = function(attrs) {
      this.victims = new VictimList(this.get('victims'));
      this.setTimes();
      this.bind('change', this.setTimes);
      this.bind('change:victims', function() {
        return this.victims = new VictimList(this.get('victims'));
      });
      return this;
    };

    Homicide.prototype.setTimes = function() {
      var attr, _i, _len, _ref, _results;
      _ref = ['datetime', 'created', 'modified'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        if (this.get(attr)) {
          _results.push(this.attributes[attr] = Date.parse(this.get(attr)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Homicide.prototype.toString = function() {
      var names;
      if (this.victims) {
        names = this.victims.map(function(v) {
          return v.get('full_name');
        });
        return _.compact(names).join(', ');
      } else {
        return "Homicide " + this.id;
      }
    };

    Homicide.prototype.url = function() {
      return this.get('resource_uri') || ("/api/v1/homicides/" + this.id + "/");
    };

    return Homicide;

  })(Backbone.Model);

}).call(this);
