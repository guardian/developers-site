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

```
./node_modules/.bin/gulp
git checkout gh-pages
git fetch
git reset --hard origin/gh-pages
git add .
git commit --message "Update"
git push
```

Note: Our web fonts only work under hosts matching `*.theguardian.com`.
