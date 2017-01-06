FROM mhart/alpine-node:6

WORKDIR /src

ADD . .

RUN npm install --production

CMD ["node", "app.js"]
