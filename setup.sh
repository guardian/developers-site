#!/bin/bash

test $(which npm)
if [ $? != "0" ]; then
    echo -e "npm not found: please install Node.js"
    exit 1
fi

BASE="`dirname \"$0\"`"

set -o errexit

bundle install --gemfile $BASE/Gemfile-sass

npm install

./node_modules/.bin/jspm install

# Initial build
./node_modules/.bin/gulp

