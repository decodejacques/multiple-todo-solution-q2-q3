const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))


// The following two endpoints are so that the browser can load the HTML and Javascript
app.get('/', (req, res) => res.send(fs.readFileSync('./public/index.html').toString()))
app.get('/app.js', (req, res) => res.send(fs.readFileSync('./public/app.js').toString()))

// 
let serverState = {
    items: {}
}

app.post('/items', (req, res) => {
    res.send(JSON.stringify(serverState.items));
})

app.post('/addItem', (req, res) => {
    // Remember: the body of an HTTP response is just a string.
    // You need to convert it to a javascript object
    let parsedBody = JSON.parse(req.body.toString())
    // This is just a convenience to save some typing later on
    let listName = parsedBody.listName;
    // If the list doesn't exist, create it
    if (!serverState.items[listName]) { serverState.items[listName] = [] }
    // The following could be rewritten in a shorter way using push.
    // Try rewriting it. It will help you understand it better.
    serverState.items[listName] = serverState.items[listName].concat(parsedBody.item)
    res.send(JSON.stringify(serverState.items));
})

app.post('/reverse', (req, res) => {
    // Remember: the body of an HTTP response is just a string.
    // You need to convert it to a javascript object
    let parsedBody = JSON.parse(req.body.toString())
    // This is just a convenience to save some typing later on
    let listName = parsedBody.name;
    // If the list doesn't exist, create it
    if (!serverState.items[listName]) { serverState.items[listName] = [] }
    // Reverse the specific list
    serverState.items[listName].reverse();

    res.send(JSON.stringify(serverState.items));
});

app.post('/removeThem', (req, res) => {
    // Remember: the body of an HTTP response is just a string.
    // You need to convert it to a javascript object
    let parsedBody = JSON.parse(req.body.toString())
    // This is just a convenience to save some typing later on
    let listName = parsedBody.name;
    // If the list doesn't exist, create it
    if (!serverState.items[listName]) { serverState.items[listName] = [] }
    // Reverse the specific list
    serverState.items[listName] = [];

    res.send(JSON.stringify(serverState.items));
});

app.listen(4000, () => console.log('Example app listening on port 4000!'))
