var helpers = {};
helpers.helper = {};


/* Node require */
var markdown = require("github-flavored-markdown");


/* App require */
var config = rekuire("config/app");


helpers.helper.markdown = function(options){
  return markdown.parse(options.fn(this));
};

helpers.helper.include = function(givenRequests, givenFlags, options){
  /*
  Flags:
    - css
    - js
    - polymer
    - ! => bower
  */

  var flags = givenFlags.split(" ");

  if(flags.indexOf("css") !== -1 && this.page.include !== undefined && this.page.include.css !== undefined){
    givenRequests += " " + this.page.include.css;
  }

  if(flags.indexOf("js") !== -1 && this.page.include !== undefined && this.page.include.js !== undefined){
    givenRequests += " " + this.page.include.js;
  }

  if(flags.indexOf("polymer") !== -1 && this.page.include !== undefined && this.page.include.polymer !== undefined){
    givenRequests += " " + this.page.include.polymer;
  }

  var requests = givenRequests.split(" ");

  var rootDir = config.app.siteUrl;
  var dir = "";

  for(var i = 0; i < flags.length; i++){
    var flag = flags[i];

    switch(flag){
      case "css":
        dir = "styles/css/";
        break;
      case "js":
        dir = "scripts/javascripts/";
        break;
      case "polymer":
        dir = "bower/";
        break;
    }
  }

  var html = "";

  for(var n = 0; n < requests.length; n++){
    var request = requests[n];

    var requestDir = dir;

    if(request.charAt(0) === "!"){
      requestDir = "bower/";
      request = request.substr(1, request.length);
    }

    if(flags.indexOf("polymer") !== -1){
      html += "<link rel=\"import\" href=\"" + rootDir + requestDir + request + "/" + request + ".html\">";
    }

    if(flags.indexOf("css") !== -1){
      html += "<link rel=\"stylesheet\" href=\"" + rootDir + requestDir + request + "\">";
    }

    if(flags.indexOf("js") !== -1){
      html += "<script src=\"" + rootDir + requestDir + request + "\"></script>";
    }
  }

  return html;
};

helpers.helper.equals = function(first, second, options){
  if(first === second){
    return options.fn(this);
  } else{
    return "";
  }
};

helpers.helper.exists = function(existCheck, options){
  if(existCheck !== undefined){
    return options.fn(this);
  } else{
    return options.inverse(this);
  }
};

helpers.exports = {
  "markdown": helpers.helper.markdown,
  "include": helpers.helper.include,
  "equals": helpers.helper.equals,
  "exists": helpers.helper.exists
};

helpers.render = function(res, givenData, pageId, layout){
  var siteData = config.app;
  var pageData = givenData;

  var data = {
    "site": siteData,
    "page": pageData
  };

  data.page.pageId = pageId;

  if(layout !== undefined){
    data.layout = layout;
  }

  res.render(pageId, data);
};

module.exports = helpers;
