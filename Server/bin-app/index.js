var express = require("express");
var app = express();
var exhb = require("express-handlebars");
global.rekuire = require("rekuire");

var config = rekuire("config/app");
var handlebars = rekuire("handlebarsHelpers");


app.engine("handlebars", exhb({
  "extname": "handlebars",
  "partialsDir": "./client/views/partials",
  "layoutsDir": "./client/views/layouts",
  "defaultLayout": "main",
  "helpers": handlebars.exports
}));

app.set("views", "./client/views");
app.set("view engine", "handlebars");
app.use("/bower", express.static("./bower"));
app.use("/", express.static("./client"));


function useDB(collectionName, cb){
	mongo.connect("mongodb://" + config.app.secrets.database.username + ":" + config.app.secrets.database.password + "@ds035280.mongolab.com:35280/bin", function(err, db){
		if(err) throw err;

		var collection = db.collection(collectionName);

		if(!!cb){
			cb(db, collection);
		}

	});
}



app.get("/", function(req, res){
  var data = {
    "title": "Home",
    "cssId": "home",
    "include": {
      "css": "pages/home.css"
    }
  };

  handlebars.render(res, data, "pages/home");
});

app.get("/showBin", function(req, res){
  var data = {
    "cssId": "showBin",
    "binCode": req.query.binCode,
    "include": {
      "css": "pages/showBin.css"
    }
  };

  handlebars.render(res, data, "pages/showBin");
});

app.get("/getBin", function(req, res){
  var binCode = req.query.binCode;
  var binSecret = req.query.binSecret;
  var binContent = "";
  var data = {};

  if(binCode === undefined || binSecret === undefined || binCode.length === 0 || binSecret.length === 0){
    data.error = "You must fill in all fields";
  } else{
    data.binCode = binCode;
    data.binSecret = binSecret;
    data.binContent = "Whoa a bin";
  }

  res.json(data);
});

app.post("/makeBin", function(req, res){

});


app.listen(config.app.port, function(){
  console.log("Server now running on port " + config.app.port);
});
