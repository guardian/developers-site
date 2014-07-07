BASE_DIR=$(dirname $0)

git checkout master
git pull
$BASE_DIR/node_modules/.bin/gulp
git checkout gh-pages
git fetch
git reset --hard origin/gh-pages
yes | cp -r $BASE_DIR/target/* $BASE_DIR
git add $BASE_DIR
git commit --message "Update"
git push
git checkout master
