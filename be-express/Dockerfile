FROM node:20

WORKDIR /app

COPY be-express/package*.json ./
RUN npm install

COPY be-express/ ./

COPY sqlite.db ./express.db

CMD ["node", "index.js"]