FROM node:18-alpine
WORKDIR /react-app

COPY package.json /react-app
COPY package-lock.json /react-app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
