FROM node:14.17.0-alpine

EXPOSE 4200

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build --production

CMD ["npm", "run", "start", "--production"]
