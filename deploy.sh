#!/bin/bash

echo "Starting deploy...";

set -e # exit with nonzero exit code if anything fails

if [[ $TRAVIS_BRANCH == "master" && $TRAVIS_PULL_REQUEST == "false" ]]; then
  npm run build:github;
  git push https://torabian:${GITHUB_TOKEN}@github.com/owsolutions/amazing-time-picker :gh-pages && git subtree push --prefix dist https://torabian:${GITHUB_TOKEN}@github.com/owsolutions/amazing-time-picker gh-pages
  
else
 echo "Skipped updating gh-pages, because build is not triggered from the master branch."
fi;