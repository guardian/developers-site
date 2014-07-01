System.config({
  "paths": {
    "*": "*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "github:ded/reqwest": "github:ded/reqwest@^1.1.0",
    "npm:ejs": "npm:ejs@^1.0.0",
    "npm:ejs@1.0.0": {},
    "github:jspm/nodelibs@0.0.2": {
      "inherits": "npm:inherits@^2.0.1",
      "ieee754": "npm:ieee754@^1.1.1",
      "base64-js": "npm:base64-js@^0.0.4",
      "Base64": "npm:Base64@0.2",
      "json": "github:systemjs/plugin-json@master"
    },
    "npm:inherits@2.0.1": {},
    "npm:ieee754@1.1.3": {},
    "npm:base64-js@0.0.4": {},
    "npm:Base64@0.2.1": {},
    "github:systemjs/plugin-text": "github:systemjs/plugin-text@master",
    "moment": "github:moment/moment@^2.7.0"
  }
});

System.config({
  "versions": {
    "github:ded/reqwest": "1.1.1",
    "npm:ejs": "1.0.0",
    "github:jspm/nodelibs": "0.0.2",
    "npm:inherits": "2.0.1",
    "npm:ieee754": "1.1.3",
    "npm:base64-js": "0.0.4",
    "npm:Base64": "0.2.1",
    "github:systemjs/plugin-json": "master",
    "github:systemjs/plugin-text": "master",
    "github:moment/moment": "2.7.0"
  }
});

