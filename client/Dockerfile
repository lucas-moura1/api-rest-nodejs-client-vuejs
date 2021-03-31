FROM node:12

WORKDIR /usr/client

RUN rm -rf node_modules/

COPY ./package.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "serve"]
