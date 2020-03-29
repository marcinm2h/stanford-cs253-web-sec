#!/bin/bash
trap 'kill %1;' SIGINT
npx http-server $DIR -p 3000 &\
echo "Go to http://localhost:3000/site-a.html\n" &&\
wait
