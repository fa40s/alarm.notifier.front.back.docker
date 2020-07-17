FROM node:alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm i --only=prod
COPY . /app
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 1337
CMD ["nginx", "-g", "daemon off;"]
