window.templates = {}
templates.popup = Hogan.compile '''<div class="datetime">
    <time datetime="{{datetime}}">
        {{#datetime}}{{#toString}}MMM. d yyyy, h:mm tt{{/toString}}{{/datetime}}
    </time>
</div>
<div class="victims">
    {{#victims}}
        {{> victim}}
    {{/victims}}
</victims>
<div class="location">
    {{address}}
</div>'''
templates.victim = Hogan.compile '''<div class="victim" id="v{{id}}">
    {{#profile_photo}}
    <img src="{{thumbnail}}" class="profile_photo">
    {{/profile_photo}}
    <p><strong><a href="{{absolute_url}}">{{full_name}}</a></strong></p>
</div>'''

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
    
    next: ->
        # return the next chronological homicide
        # collections are sorted in reverse chron
        return unless @collection
        ids = @collection.pluck 'id'
        index = _.indexOf ids, @get 'id', true
        @collection.at index - 1


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

# collections

###
HomicideList handles all filtering methods related
to homicide incidents.
###
class HomicideList extends Backbone.Collection
    
    model: Homicide
    
    initialize: (models, options) ->
        this
    
    parse: (response) ->
        response.objects
    
    # return a VictimList from all victims in this incident collection
    getVictims: ->
        victims = @map (homicide) ->
            return homicide.victims
        new VictimList(_.flatten(victims))
    
    
class VictimList extends Backbone.Collection
    
    model: Victim
    
    parse: (response) ->
        response.objects
# map views

class Map extends Backbone.View
    
    

# routers
# start this thing