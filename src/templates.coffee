templates = {}
templates.popup = Hogan.compile '''<div id="h{{id}}" class="homicide-popup">
    <div class="datetime">
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
    </div>
</div>'''
templates.victim = Hogan.compile '''<div class="victim" id="v{{id}}">
    {{#profile_photo}}
    <img src="{{thumbnail}}" class="profile_photo">
    {{/profile_photo}}
    <p><strong><a href="{{absolute_url}}">{{full_name}}</a></strong></p>
    <dl>
        {{#age}}<dt>Age: {{age}}</dt>{{/age}}
        <dt>Gender: {{gender}}</dt>
    </dl>
</div>'''
@templates = templates