/* Setup namespace */
var binApp = {};
binApp.helpers = {};
binApp.config = {};
binApp.deps = {};

/* App require */
binApp.config.secrets = rekuire("config/secrets");
binApp.helpers.merge = rekuire("mergeHelper");
binApp.config.enviroment = process.argv[2] !== undefined ? process.argv[2] : "development";

binApp.config.app = {};


/* Setup common values */
binApp.config.parent = {
  "database": {
    "host": "ds053198.mongolab.com:53198/binApp-site",
    "userSessionsCollection": "userSessions",
    "githubApiTokensCollection": "githubApiTokens",
    "usersCollection": "users",
    "modsCollection": "mods"
  },
  "menus": {
    "main": []
  },
  "port": 3000
};

/* Enviroment specific config */
binApp.config.development = {
  "siteUrl": "http://127.0.0.1:3000/"
};

binApp.config.production = {
  "siteUrl": "http://bin-app.herokuapp.com",
  "port": 80
};


/* Assign config to binApp.config.app so it can always be accessed without directly knowing the enviroment */
binApp.config.app = binApp.config[binApp.config.enviroment] !== undefined ? binApp.helpers.merge.do(binApp.config.parent, binApp.config[binApp.config.enviroment]) : binApp.helpers.merge.do(binApp.config.parent, binApp.config.development);


/* Export */
module.exports = binApp.config;
