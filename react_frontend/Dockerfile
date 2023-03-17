FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_ENV production

EXPOSE 8081

CMD ["npm", "start"]