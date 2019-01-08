var levelup = require('levelup')
var leveldown = require('leveldown')

// 1) Create our store
var db = levelup(leveldown('./mydb'))

function put(){
    db.put('count', 69, function (err) {
        if (err) return console.log('Ooops!', err) // some kind of I/O error
        console.log("success")
    })
}

function get(){
    db.get('count', function (err, value) {
        if (err) return console.log('Ooops!', err) // likely the key was not found
    
        // Ta da!
        console.log('name=' + value)
    })
}

get()
// put()