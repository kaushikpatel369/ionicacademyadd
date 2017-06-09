	var express = require('express');
	var app = express();
	//var mongojs = require('mongojs');
	//var db = mongojs('contactlist',['contactlist,users']);
	var ObjectID = require('mongodb').ObjectID;
	var MongoClient = require('mongodb').MongoClient;
	var bodyParser = require('body-parser');
	app.use(express.static(__dirname + "/www"))
	app.use(bodyParser.json());
	app.use(function (req, res, next) {
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);
		// Pass to next layer of middleware
		next();
	});

	//var url = 'mongodb://localhost:27017/ionic';
	var url = 'mongodb://ionicacademy:7797785640sr@ds119302.mlab.com:19302/ionicacademy';
	//mongodb://raj9701:raj970123@ds155727.mlab.com:55727/contactlists
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	console.log("Connected to Database");
	
	

	app.post('/ionicadd',function(req,res){
			console.log(req.body)
			db.collection('book').insertOne(req.body,function(err,docs){
				console.log(docs);
				res.json(docs);
			})
	});
	
	app.post('/ionicfind',function(req,res){
			console.log(req.body)
			db.collection('book').findOne({category:req.body.category,desc:req.body.desc,heading:req.body.heading,img:req.body.img},function(err,docs){
				console.log(docs);
				res.send(docs);
			});
	});
	
});
var port = process.env.PORT || 4000;
app.listen(port);
console.log("App listening on Port ",+port);