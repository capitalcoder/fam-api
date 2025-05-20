FROM node:23-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "asset-tracking.js"]
