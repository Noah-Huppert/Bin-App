/* Setup namespace */
var binApp = {};
binApp.helpers = {};
binApp.config = {};
binApp.deps = {};


/* App require */
binApp.helpers.merge = rekuire("mergeHelper");


binApp.config.enviroment = process.argv[2] !== undefined ? process.argv[2] : "development";
binApp.config.secrets = {};


/* Setup common values */
binApp.config.parent = {

};

/* Enviroment specific config */
binApp.config.development = {
  "database": {
    "username": "Your Development Username Here",
    "password": "Your Development Password Here"
  }
};

binApp.config.production = {
  "database": {
    "username": "Your Production Username Here",
    "password": "Your Production Password Here"
  }
};


binApp.config.secrets = binApp.config[binApp.config.enviroment] !== undefined ? binApp.helpers.merge.do(binApp.config[binApp.config.enviroment], binApp.config.parent) : binApp.helpers.merge.do(binApp.config.development, binApp.config.parent);

/* Export */
module.exports = binApp.config.secrets;
