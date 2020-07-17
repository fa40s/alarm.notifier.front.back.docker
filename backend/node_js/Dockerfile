FROM node:alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm i --only=prod
COPY . /app
EXPOSE 1337
CMD ["node", "server.js"]

