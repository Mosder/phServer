var express = require("express")
var app = express()
var path = require('path');
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

app.get('/', async function (req, res) {
    let files = await getFiles();
    console.log(files);
    res.sendFile(path.join(__dirname + '/static/page.html'));
});

const fs = require('fs').promises;
const imgDir = path.join(__dirname + '/static/upload');

async function getFiles() {
    try {
        const data = await fs.readdir(imgDir);
        return data;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}