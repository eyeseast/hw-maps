async  = require 'async'
{exec} = require 'child_process'
fs     = require 'fs'
glob   = require 'glob'
Hogan  = require 'hogan.js'
path   = require 'path'
util   = require 'util'
yaml   = require 'yaml'

CWD = process.cwd()
# at some point, move this to an external file
config =
    coffee: ['templates', 'models', 'collections', 
            'views/maps', 'views/windows', 'routers', 'initialize']
    less: "src/styles/bootstrap/bootstrap.less"
    templates: "src/templates/*.jst"
#config = yaml.eval fs.readFileSync('config/assets.yml', 'utf8')

std = (err, stdout, stderr) ->
    throw err if err
    console.error stderr
    console.log stdout

task 'build', 'Build javascript and css files from src/ into public/', (options)->
    console.log 'Building...'
    invoke 'build:images'
    invoke 'build:styles'
    invoke 'build:scripts'
    invoke 'build:templates'
    # invoke 'package'

task 'build:images', 'Copy images into public/img/', (options)->
    console.log 'Copying images...'


task 'build:styles', 'Compile CSS from LESS files into public/css/', (options)->
    console.log 'Compiling LESS...'
    exec "lessc #{config.less} > public/css/style.css", std

task 'build:scripts', 'Compile CoffeeScript files into public/js', (options)->
    console.log 'Compiling coffee scripts...'
    coffees = ("#{CWD}/src/#{fn}.coffee" for fn in config.coffee if config.coffee)
    return unless coffees
    read = (file, cb) ->
        fs.readFile file, 'utf8', cb
    
    async.map coffees, read, (err, results) ->
        throw err if err
        data = results.join('\n')
        fs.writeFile 'src/hw.coffee', data, (err) ->
            throw err if err
            console.log "Compiled #{coffees.length} files as src/hw.coffee"
            exec "coffee -c -o public/js/ src/hw.coffee", std
                    
task 'build:templates', 'Precompile templates into one CoffeeScript file', (options) ->
    template = Hogan.compile """
    templates = {}
    {{#templates}}templates.{{name}} = Hogan.compile '''{{{string}}}'''
    {{/templates}}
    @templates = templates
    """
    glob config.templates, (err, files) ->
        templates = files.map (file) ->
            name: path.basename(file, '.jst'), 
            string: fs.readFileSync(file, 'utf8')
        
        fs.writeFile "#{CWD}/src/templates.coffee", template.render templates: templates, std


task 'package', 'Run jammit on built javascript, css and image files', (options)->
    console.log 'Packaging assets...'
    exec 'jammit', std