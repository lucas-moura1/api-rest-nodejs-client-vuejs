FROM node:12

WORKDIR /usr/app

RUN rm -rf node_modules/

COPY ./package.json .

RUN yarn

COPY . .

EXPOSE 9090

CMD ["yarn", "start"]
