FROM node:latest

# Create app directory
RUN mkdir -p /api
WORKDIR /api

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]