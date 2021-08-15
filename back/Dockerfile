FROM node:16-alpine

EXPOSE 9191

WORKDIR /app
COPY . .
COPY .env.docker .env

RUN npm install

CMD [ "node", "src/index.js" ]
