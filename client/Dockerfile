FROM node:18-alpine as builder
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/.next /usr/share/nginx/html