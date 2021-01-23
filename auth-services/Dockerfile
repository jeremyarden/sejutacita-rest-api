FROM node:15.6-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7999
CMD ["node", "server.js"]