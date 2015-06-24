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
    "github:anselmh/object-fit": "github:anselmh/object-fit@0.3.7",
    "github:ded/reqwest": "github:ded/reqwest@1.1.5",
    "github:systemjs/plugin-css": "github:systemjs/plugin-css@0.1.13",
    "github:systemjs/plugin-text": "github:systemjs/plugin-text@master",
    "moment": "github:moment/moment@2.10.3",
    "npm:ejs": "npm:ejs@1.0.0",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:ejs@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

