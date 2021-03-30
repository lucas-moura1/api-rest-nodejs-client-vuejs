FROM node:12

WORKDIR /usr/app

RUN rm -rf node_modules/

COPY ./api/package.json .

RUN yarn install

COPY ./api .

EXPOSE 9090

CMD ["yarn", "start"]
