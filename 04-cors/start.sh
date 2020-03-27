#!/bin/bash
npx http-server 04-cors -p 3000 &\
npx http-server 04-cors -p 3001 &\
echo "Go to http://localhost:3000/parent.html"
