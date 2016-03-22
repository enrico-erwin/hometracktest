var port = process.env.PORT || 8080

var express = require('express')
var bodyParser = require('body-parser')
var homeFilter = require("./services/homefilter.js")

var jsonParser = bodyParser.json()
var app = express()

app.use(jsonParser)
app.use(function(err, req, res, next) {
	res.status(400)
	res.send({ error: 'Could not decode request: JSON parsing failed' })
})


app.post('/:type/:workflow', homeFilter.filterByTypeAndWorkflow)

//default endpoint
app.post('/', homeFilter.filterByTypeAndWorkflow)

var server = app.listen(port)