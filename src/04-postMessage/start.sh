#!/bin/bash
trap 'kill %1; kill %2;' SIGINT
npx http-server $DIR -p 3000 &\
npx http-server $DIR -p 3001 &\
echo "Go to http://localhost:3000/parent.html\n" &&\
wait
