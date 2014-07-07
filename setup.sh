#!/bin/bash

set -o errexit

BASE="`dirname \"$0\"`"

bundle install --gemfile $BASE/Gemfile-sass

npm install

cd ./src
jspm install
cd ..

# Initial build
./node_modules/.bin/gulp

