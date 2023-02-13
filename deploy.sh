#!/bin/bash

cd ~/band_schedule_api
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
npx sequelize-cli db:migrate
npm i
npm --help
pm2 reload api