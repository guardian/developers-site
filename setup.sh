#!/bin/bash

test $(which npm)
if [ $? != "0" ]; then
    echo -e "npm not found: please install Node.js"
    exit 1
fi

test $(which jspm2)
if [ $? != "0" ]; then
    echo -e "jspm not found: please run 'sudo npm install -g jspm'"
    exit 1
fi

BASE="`dirname \"$0\"`"

set -o errexit

bundle install --gemfile $BASE/Gemfile-sass

npm install

cd ./src
jspm dl-loader
cd ..

# Initial build
./node_modules/.bin/gulp

