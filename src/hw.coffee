# models

@Homicide = Backbone.Model.extend
    
    initialize: (attrs) ->
        @victims = new VictimList @get('victims')
        @setTimes()
        
        @bind 'change', @setTimes
        @bind 'change:victims', ->
            @victims = new VictimList @get('victims')
        
        return this
    
    setTimes: ->
        for attr in ['datetime', 'created', 'modified']
            if @get attr
                @attributes[attr] =  Date.parse( @get attr )

    toString: ->
        if @victims
            names = @victims.map (v) ->
                v.get('full_name')
            return _.compact(names).join(', ')
        else
            return "Homicide #{@id}"

    url: ->
        @get('resource_uri') or "/api/v1/homicides/#{@id}/"
# collections
# routers
# start this thing