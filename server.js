var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

var request = require('request');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
//static since these files don't change - css, html, js files.
//we are giving it the path where it should look for the path

/*
app.get('/', function(req,res){
    res.send("Hello world from server.js");
});
*/
//same route as in ctrl.js
app.get('/contactlist', function(req, res){
    console.log("I received a get request");
    db.contactlist.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
    // var auth = $base64.encode("ngpuser2:a1a005bc-67fa-4f47-b614-25c850a5c43d");
    // var headers = {"Authorization": "Basic " + auth};
    // var url = "http://129.41.229.188:8080/v2/identity/token";
    //
    // $http.get(url, {headers: headers}).success(function(data) {
    //   console.log(data);
    /*
    request.get({
        url:
        headers:
        Authorization:
    },function(error,response){
        if(err) console.log(err);
        else{
            // Make the next call or whatever on success
        }
    })*/

    //its going to send the response in json format
});

app.post('/contactlist', function(req, res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err,doc){
        res.json(doc);
    });
});

app.delete('/contactlist/:id', function(req,res){
    console.log("reached here");
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
        res.json(doc);
    });
});

app.get('/contactlist/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
        res.json(doc);
    });
});

app.put('/contactlist/:id', function(req,res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true},
    function(err,doc){
        res.json(doc);
    });
});
app.listen(3000);
console.log("Server running at port 3000");
