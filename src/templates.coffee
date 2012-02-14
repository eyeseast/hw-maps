templates = {}
templates.popup = Hogan.compile '''<div class="datetime">
    <time datetime="{{ datetime }}">
        {{ #datetime }}{{ #toString }}MMM. d yyyy, h:mm tt{{ /toString }}{{ /datetime }}
    </time>
</div>
<div class="victims">
    {{#victims}}
        {{> victim }}
    {{/victims}}
</victims>
<div class="location">
    {{ address }}
</div>'''
templates.victim = Hogan.compile '''<div class="victim" id="v{{id}}">
    {{#profile_photo}}
    <img src="{{thumbnail}}" style="float:left; margin: 0 .5em .5em 0;"
    height="75" width="75" class="profile_photo">
    {{/profile_photo}}
    <p><strong><a href="{{absolute_url}}">{{full_name}}</a></strong></p>
</div>'''
