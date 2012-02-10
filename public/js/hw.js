(function() {

  this.Homicide = Backbone.Model.extend({
    initialize: function(attrs) {
      this.victims = new VictimList(this.get('victims'));
      this.setTimes();
      this.bind('change', this.setTimes);
      this.bind('change:victims', function() {
        return this.victims = new VictimList(this.get('victims'));
      });
      return this;
    },
    setTimes: function() {
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
    },
    toString: function() {
      var names;
      if (this.victims) {
        names = this.victims.map(function(v) {
          return v.get('full_name');
        });
        return _.compact(names).join(', ');
      } else {
        return "Homicide " + this.id;
      }
    },
    url: function() {
      return this.get('resource_uri') || ("/api/v1/homicides/" + this.id + "/");
    }
  });

}).call(this);
