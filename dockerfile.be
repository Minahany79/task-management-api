FROM node:14
WORKDIR /app

RUN ls -a
COPY . .
RUN npm i

EXPOSE 3000
RUN npm install typeorm -g --save

ENTRYPOINT ["npm", "run", "migrate-and-start"];