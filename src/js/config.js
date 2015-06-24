System.config({
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "npm:*": "src/jspm_packages/npm/*.js",
    "github:*": "src/jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "ejs": "npm:ejs@2.3.2",
    "moment": "github:moment/moment@2.10.3",
    "reqwest": "github:ded/reqwest@1.1.6",
    "text": "github:systemjs/plugin-text@0.0.2",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:ejs@2.3.2": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

