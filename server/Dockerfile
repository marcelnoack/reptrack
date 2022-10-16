FROM node:alpine

WORKDIR /usr/src/reptrack/server

RUN adduser -S app

COPY package*.json .

RUN npm install

COPY . .

RUN chown -R app /usr/src/reptrack/server

USER app

CMD ["npm", "run", "start:dev"]