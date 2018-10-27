var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongo = require('mongodb');
var fetch = require('node-fetch');
var MongoClient = mongo.MongoClient;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, C-Requested-With, Content-Type, Accept");
    next();
});


app.post("/ping",(req,res)=>{
    res.send("pong")
})
app.get("/ping",(req,res)=>{
    res.send("pong")
})

app.get('/incident/image', (req, res) =>{
    let id = req.query.id;
    let collectionName = req.query.collection;
    if(collectionName == null || collectionName == '')
        collectionName = 'incidents';
    MongoClient.connect("mongodb://mongordxnasa.southcentralus.cloudapp.azure.com", function(err, client) {
        if(err) {
            console.log(err);
            res.send('error');
            return err;
        }
        let db = client.db('rdx');
        let collection = db.collection(collectionName);

        collection.findOne({ _id: mongo.ObjectID(id) },(err, item) =>{
            if(err){
                console.log(err)
                res.send("error")
                return err
            }
            if(item.thumb == null){
                res.send();
                return;
            }
            console.log(item.thumb);
            var img = new Buffer(item.thumb, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            res.end(img);
            //res.send(item.thumb);
            return 'success';
        });
    });
});


app.get("/risk",(req,res)=>{
    getRisk(req.query["latitude"],req.query["longitude"],(d)=>{
        res.send(d);
    })
});

app.get('/incident', (req,res) =>{
    let id = req.query.id;
    let collectionName = req.query.collection;
    if(collectionName == null || collectionName == '')
        collectionName = 'incidents';
    MongoClient.connect("mongodb://mongordxnasa.southcentralus.cloudapp.azure.com", function(err, client) {
        if(err) {
            console.log(err);
            res.send('error');
            return err;
        }
        let db = client.db('rdx');
        let collection = db.collection(collectionName);

        collection.findOne({ _id: mongo.ObjectID(id) },(err, item) =>{
            if(err){
                console.log(err)
                res.send("error")
                return err
            }
            res.send(JSON.stringify(item.map(i => {
                i.url = "/image?id="+item._id;
                return i;
            }), null, 3));
            return 'success';
        });
    });
});


app.get('/image', (req,res) =>{
    let id = req.query.id;
    let collectionName = req.query.collection;
    if(collectionName == null || collectionName == '')
        collectionName = 'incidents';
    MongoClient.connect("mongodb://mongordxnasa.southcentralus.cloudapp.azure.com", function(err, client) {
        if(err) {
            console.log(err);
            res.send('error');
            return err;
        }
        let db = client.db('rdx');
        let collection = db.collection(collectionName);

        collection.findOne({ _id: mongo.ObjectID(id) },(err, item) =>{
            if(err){
                console.log(err)
                res.send("error")
                return err
            }

            var img = new Buffer(item.thumb, 'base64');

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            res.end(img);
        });
    });
});

app.get("/incidents", (req,res)=>{
    let latitude = +req.query.latitude;
    let longitude = +req.query.longitude;
    let collectionName = req.query.collection;
    if(collectionName == null || collectionName == '')
        collectionName = 'incidents';
    console.log("lat:  " + latitude);
    console.log("long: " + longitude);
    MongoClient.connect("mongodb://mongordxnasa.southcentralus.cloudapp.azure.com", function(err, client) {
        if(err) {
            console.log(err);
            res.send("error")
            return err;
        }
        let db = client.db('rdx');
        let collection = db.collection(collectionName);

        collection.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [ longitude, latitude ],
                        100 / 3963.2
                    ]
                }
            }
        }).toArray(function(err, items) {
            if(err){
                console.log(err)
                res.send("error")
                return err;
            }
            res.send(JSON.stringify(items.map(i => {
                i.url = "/image?id="+i._id;
                return i;
            }), null, 3));
            return 'success';
        });
    });
});

function getDadosTempo(lat,long){
    return fetch('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=110480bdb477a78ca4279f6c1cc1e97d')
        .then(res => res.json())
        .then(res => {
            return {
                temperature: (res.main.temp - 273.15) * 9 / 5 + 32,
                humidity: res.main.humidity,
                pressure: res.main.pressure,
                wind: res.wind.speed
            };
        })
        .catch(err => {
            return {};
        });
}

app.post("/incident", (req,res)=>{
    let incident = req.body;
    incident.datetime = Math.round((new Date()).getTime() / 1000);
    incident.origin = 'user';

    var condicoes = getDadosTempo(incident.location.coordinates[0], incident.location.coordinates[1]);

    condicoes.then( cond => {
        incident.weather = cond;
        MongoClient.connect("mongodb://mongordxnasa.southcentralus.cloudapp.azure.com/", function(err, client) {
            if(err) {
                return err;
            }
            let db = client.db('rdx');
            let collection = db.collection('incidents');

            collection.insert(incident, function(err,docsInserted){
                res.send(docsInserted.ops[0]._id);
            });
        });
    });
});


app.get("/incident/upvote", (req, res) =>{
    let id = req.query.id;
    let collectionName = req.query.collection;
    if(collectionName == null || collectionName == '')
        collectionName = 'incidents';
    MongoClient.connect("mongodb://mongordxnasa.southcentralus.cloudapp.azure.com", function(err, client) {
        if(err) {
            console.log(err);
            res.send('error');
            return err;
        }
        let db = client.db('rdx');
        let collection = db.collection(collectionName);

        collection.findOne({ _id: mongo.ObjectID(id) },(err, item) =>{
            if(err){
                console.log(err)
                res.send("error")
            }
            if(item.upvotes == null)
                item.upvotes = 0;
            item.upvotes += 1;
            collection.update({ _id: mongo.ObjectID(id) }, { $set: { upvotes: item.upvotes }}, function(err2, item2){
                if(err2){
                    console.log(err2)
                    res.send("error")
                }
                res.send(JSON.stringify(item2, null, 3));
            })
        });
    });
});

app.get("/incident/downvote", (req, res) =>{
    let id = req.query.id;
    let collectionName = req.query.collection;
    if(collectionName == null || collectionName == '')
        collectionName = 'incidents';
    MongoClient.connect("mongodb://mongordxnasa.southcentralus.cloudapp.azure.com", function(err, client) {
        if(err) {
            console.log(err);
            res.send('error');
            return err;
        }
        let db = client.db('rdx');
        let collection = db.collection(collectionName);

        collection.findOne({ _id: mongo.ObjectID(id) },(err, item) =>{
            if(err){
                console.log(err)
                res.send("error")
            }
            if(item.upvotes == null)
                item.upvotes = 0;
            item.upvotes -= 1;
            collection.update({ _id: mongo.ObjectID(id) }, { $set: { upvotes: item.upvotes }}, function(err2, item2){
                if(err2){
                    console.log(err2)
                    res.send("error")
                }
                res.send(JSON.stringify(item2, null, 3));
            })
        });
    });
});




function getRisk(lat,long,callback){
    var unirest = require("unirest");

    var req = unirest("GET", "http://snasa-ml.herokuapp.com/");

    req.query({
    "latitude": lat,
    "longitude": long
    });

    req.headers({
    "content-type": "application/json"
    });

    req.type("json");
    req.send();

    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        callback(res.body);
    });

}

app.use(express.static("www"));
app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'),function(){
    console.log("Express listening on port ",app.get('port'));
});
