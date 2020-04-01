#!/bin/bash
trap 'kill %1;' SIGINT
PORT=$PORT node $DIR/app.js &&\
wait
