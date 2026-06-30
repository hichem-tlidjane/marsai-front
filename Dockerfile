FROM node:24.18.0-alpine3.23 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG VITE_SERVER_ADDRESS

COPY . .
RUN npm run build

FROM nginx:1.30.3-alpine3.23

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf