#!/bin/bash

echo "Is this a production server? [y/n]"

read prod
if [ $prod = y ]
then
  echo "Launching timelyn production server forever"
  forever start -al timelyn/forever.log app.js --prod
else
  echo "Launching timelyn development server forever"
  forever start -wal dev-timelyn/forever.log app.js
fi
