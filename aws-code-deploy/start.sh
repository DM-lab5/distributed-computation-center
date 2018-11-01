#!/bin/bash

if [ $NODE_ENV == 'development' ]; then
    nodemon ../server.js
else
    node ../server.js
fi
