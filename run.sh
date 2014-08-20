PORT=${PORT:-8080}

./node_modules/.bin/http-server target -c-1 -i --silent -p $PORT &
./node_modules/.bin/gulp watch
