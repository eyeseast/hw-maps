
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"initialize": function(exports, require, module) {(function() {



}).call(this);
}, "models/homicide": function(exports, require, module) {(function() {
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
}});
