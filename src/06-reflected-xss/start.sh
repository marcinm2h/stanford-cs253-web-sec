#!/bin/bash
trap 'kill %1;' SIGINT
node $DIR/app.js &\
echo "Go to http://localhost:3000\n" &&\
wait
