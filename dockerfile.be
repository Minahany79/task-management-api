FROM node:20

WORKDIR /app

COPY package.json .
RUN npm install --production

RUN npm install -g pm2

COPY . .

EXPOSE 3000

CMD ["npm", "run", "migrate-and-start"]