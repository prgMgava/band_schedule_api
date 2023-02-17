#!/bin/bash

cd ~/band_schedule_api
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
npm i
npm --help
pm2 reload api