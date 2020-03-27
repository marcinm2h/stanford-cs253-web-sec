#!/bin/bash
trap 'kill %1; kill %2;' SIGINT # https://unix.stackexchange.com/a/204619
npx http-server 04-cors -p 3000 &\
npx http-server 04-cors -p 3001 &\
echo "Go to http://localhost:3000/parent.html\n" &&\
wait
