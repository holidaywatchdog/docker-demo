FROM node:6

MAINTAINER Robert Norman <rnorman@tripadvisor.com>

ENV MEMCACHED_HOST mc:11211

ADD . /src

WORKDIR /src

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]