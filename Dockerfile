FROM node:12

LABEL maintainer="Enrique Matta <enrique@matta.dev>"

ADD ./ /app

WORKDIR /app

RUN yarn
