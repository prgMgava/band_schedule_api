FROM node:16-alpine

WORKDIR /Usuario/api
COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 3333
CMD ["npm", "start"]
