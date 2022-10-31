FROM node:16-alpine

WORKDIR /mgava/api
COPY . .

RUN npm i

COPY . .

EXPOSE 3333
CMD ["npm", "start"]
