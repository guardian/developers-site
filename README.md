# Developers Site

## Installation
Bundle is required - if you get an error such as `./setup.sh: line 13: bundle: command not found` you probably have to [install bundler](https://bundler.io/)

```
./setup.sh
```

## Development

To start the build watcher and run a http server on port 8080

To change the default port number export a PORT variable in your shell (`export PORT=9999`)

```
./run.sh
```

### Shutting down

```
fg
```

And then CTRL-C the process

## Releasing

```
./release.sh
```

Note: Our web fonts only work under hosts matching `*.theguardian.com`.
