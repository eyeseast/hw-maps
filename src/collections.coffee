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