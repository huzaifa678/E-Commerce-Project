FROM node:18-slim

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]

