fs     = require 'fs'
{exec} = require 'child_process'
stitch = require 'stitch'

paths = [
    "#{process.cwd()}/src"
]

package = stitch.createPackage paths: paths

build = (callback) ->
    

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


task 'compress', 'Run jammit on built javascript, css and image files', (options)->
    console.log 'Compressing files...'
    exec 'jammit', (err, stdout, stderr) ->
        throw err if err
        console.error stderr
        console.log stdout