FROM node:6.3.1
MAINTAINER WlniaoStudio <ideploy@wlniao.com>
EXPOSE 80

COPY . /usr/src/app
WORKDIR /usr/src/app

CMD [ "node", "proxy.js" ]