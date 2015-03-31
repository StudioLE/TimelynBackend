#!/bin/bash

echo "Launching server forever"
forever start -al timelyn/forever.log app.js
