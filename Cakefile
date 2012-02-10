async  = require 'async'
fs     = require 'fs'
{exec} = require 'child_process'
stitch = require 'stitch'
util   = require 'util'
yaml   = require 'yaml'

CWD = process.cwd()
config =
    coffee: ['models', 'collections', 'routers', 'initialize']
    less: []

task 'build', 'Build javascript and css files from src/ into public/', (options)->
    start = new Date()
    console.log 'Building...'
    invoke 'build:images'
    invoke 'build:styles'
    invoke 'build:scripts'
    invoke 'compress'

task 'build:images', 'Copy images into public/img/', (options)->
    console.log 'Copying images...'


task 'build:styles', 'Compile CSS from LESS files into public/css/', (options)->
    console.log 'Compiling LESS...'


task 'build:scripts', 'Compile CoffeeScript files into public/js', (options)->
    console.log 'Compiling coffee scripts...'
    coffees = ("#{CWD}/src/#{fn}.coffee" for fn in config.coffee)
    read = (file, cb) ->
        fs.readFile file, 'utf8', cb
    
    async.map coffees, read, (err, results) ->
        throw err if err
        data = results.join('\n')
        fs.writeFile 'src/hw.coffee', data, (err) ->
            throw err if err
            console.log "Compiled #{coffees.length} files as src/hw.coffee"
            exec "coffee -c -o public/js/ src/hw.coffee", 
                (err, stdout, stderr) ->
                    throw err if err
                    console.error stderr
                    console.log stdout
                    invoke 'compress'
                    

task 'compress', 'Run jammit on built javascript, css and image files', (options)->
    console.log 'Compressing files...'
    exec 'jammit', (err, stdout, stderr) ->
        throw err if err
        console.error stderr
        console.log stdout