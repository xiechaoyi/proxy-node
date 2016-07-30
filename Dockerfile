FROM node:6.3.1
EXPOSE 80

COPY . /usr/src/app
WORKDIR /usr/src/app

CMD [ "node", "proxy.js" ]