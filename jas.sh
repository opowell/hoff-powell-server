#!/bin/bash
echo 'Starting!!'
cd "$( dirname -- "$( readlink -f -- "$0"; )"; )"
cd ./server
./node/v20.15.0-darwin-x64/bin/node ./jas.js