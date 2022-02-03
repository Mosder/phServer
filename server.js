var express = require("express")
var app = express()
const PORT = 3000;

app.use(express.static('static'))
app.use(express.urlencoded({
    extended: true
}));

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
});

var formidable = require('formidable');
app.post('/upload', function (req, res) {
    res.setHeader("content-type", "application/json")
    let form = formidable({});
    form.multiples = true;
    form.uploadDir = __dirname + '/static/upload/'
    form.parse(req, function (err, fields, files) {
        console.log(files);
    });
    res.send({ ok: 1 })
});

app.get('/', function (req, res) {
    console.log('sus');
    res.sendFile('page.html');
});