# Developers Site

## Installation

```
./setup.sh
```

## Development

```
./node_modules/.bin/gulp watch
```
```
./node_modules/.bin/http-server target -c-1 -o
```

## Releasing

The `master` branch only contains sources. `gh-pages` only contains the compiled
code.

```
./release.sh
```

Note: Our web fonts only work under hosts matching `*.theguardian.com`.
