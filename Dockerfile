FROM node:20.18-slim

WORKDIR /e2e

COPY package*.json ./

RUN npm install

COPY . .

RUN npx -y playwright@1.49.1 install --with-deps

CMD ['npx', 'playwright', 'test']