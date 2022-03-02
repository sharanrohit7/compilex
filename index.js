var fs = require('fs');
var path = require('path')
const port = process.env.PORT || 3000;
var shell = require('shelljs');
const express = require('express')

var app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false })) // server to understand what app data is
app.use(express.json())

app.post("/python/", function(req, res) {
    fs.writeFileSync('./python.py', req.body.code);
    shell.exec('python3 python.py', function(code, stdout, stderr) {
        var result = {
            stdout: stdout,
            stderr: stderr,
            code: code
        }
        res.send(JSON.stringify(result));
    });
});

app.post("/cpp/", function(req, res) {
    fs.writeFileSync('./cpp.cpp', req.body.code);
    shell.exec('g++ cpp.cpp -o cpp', function(code, stdout, stderr) {
        var result = {
            stdout: stdout,
            stderr: stderr,
            code: code
        }
        res.send(JSON.stringify(result));
    });
});

app.post("/c/", function(req, res) {
    fs.writeFileSync('./c.c', req.body.code);
    shell.exec('gcc c.c -o c', function(code, stdout, stderr) {
        var result = {
            stdout: stdout,
            stderr: stderr,
            code: code
        }
        res.send(JSON.stringify(result));
    });
});

app.post("/cs/", function(req, res) {
    fs.writeFileSync('./cs.cs', req.body.code);
    shell.exec('mcs cs.cs -out:cs.exe', function(code, stdout, stderr) {
        var result = {
            stdout: stdout,
            stderr: stderr,
            code: code
        }
        res.send(JSON.stringify(result));
    });
});

app.post("/nodejs/", function(req, res) {
    fs.writeFileSync('./nodejs.js', req.body.code);
    shell.exec('node nodejs.js', function(code, stdout, stderr) {
        var result = {
            stdout: stdout,
            stderr: stderr,
            code: code
        }
        res.send(JSON.stringify(result));
    });
});

app.post("/ruby/", function(req, res) {
    fs.writeFileSync('./ruby.rb', req.body.code);
    shell.exec('ruby ruby.rb', function(code, stdout, stderr) {
        var result = {
            stdout: stdout,
            stderr: stderr,
            code: code
        }
        res.send(JSON.stringify(result));
    });
});

app.listen(port, () => {
    console.log('Server is running on port')
})