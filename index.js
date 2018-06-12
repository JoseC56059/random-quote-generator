var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

var server = express()

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

server.get('/', function(request, response){
    // response.send('<h1>Random Quote Generator</h1>')
    response.render('home.ejs')
})

server.post('/', function(request, response){
    var url = 'https://random-quote-generator.herokuapp.com/api/quotes/random'
    axios.get(url)
    .then( res => res.data )
    .then(data => {
        console.log(data)
        response.render('results.ejs', {data:data})
    })
    .catch(error => console.log(error))
})


var port = process.env.PORT

server.listen(port, () => {
    console.log('server listening on port'+port)
})