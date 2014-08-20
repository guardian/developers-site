# Developers Site

## Installation

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
