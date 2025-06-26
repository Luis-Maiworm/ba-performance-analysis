FROM node:20

WORKDIR /app

COPY be-node/package*.json ./
RUN npm install

COPY be-node/ ./

COPY sqlite.db ./node.db

CMD ["node", "index.js"]