FROM node:14-alpine3.14

WORKDIR /app
COPY package*.json ./

RUN npm install -g npm@7.24.0
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm install
COPY . .
EXPOSE 3010
CMD [ "node", "index.js" ]