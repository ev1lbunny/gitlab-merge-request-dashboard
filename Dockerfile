FROM node:8

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003

CMD [ "npm", "start" ]
