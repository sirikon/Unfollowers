FROM mhart/alpine-node:6

WORKDIR /src

ADD . .

RUN apk add --update mongodb-tools

RUN npm install --production

CMD ["node", "app.js"]
