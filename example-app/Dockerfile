FROM node:19-alpine3.16 AS server
USER node
WORKDIR /home/node
RUN mkdir app
COPY package*.json app/
WORKDIR /home/node/app
RUN npm ci
COPY * ./
CMD node index.js