# models

class @Homicide extends Backbone.Model
    
    initialize: (attributes, options) ->
        @victims = new VictimList @get('victims')
        @normalize()
        
        @on 'change', @normalize
        @on 'change:victims', ->
            @victims = new VictimList @get('victims')
        
        return this
    
    normalize: =>
        changes = {}
        
        # parse datetimes into Date objects
        for attr in ['datetime', 'created', 'modified']
            if @get attr
                changes[attr] =  Date.parse @get(attr)
        
        # convert a geojson point to a Leaflet point
        point = @get 'point'
        if point.coordinates
            changes.point = new L.LatLng point.coordinates[1], point.coordinates[0]
        
        @set changes

    toString: =>
        if @victims
            names = @victims.pluck 'full_name'
            return _.compact(names).join(', ')
        else
            return "Homicide #{@id}"

    url: ->
        @get('resource_uri') or "/api/v1/homicides/#{@id}/"


class Victim extends Backbone.Model
    
    initialize: (attributes) ->
        @on 'change', @normalize
        @view = new VictimInfoWindowView model: this
        return this
        
    normalize: =>
        changes = {}
        for attr in ['created', 'modified', 'dod', 'dob', 'incident_date']
            if @get attr
                changes[attr] = Date.parse @get(attr)
        
        @set changes
    
    toString: ->
        @get 'full_name'
    
    url: ->
        @get 'resource_uri' or "/api/v1/victims/#{@id}"
