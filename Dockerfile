FROM node:15.11.0

#Setup config env vars
ENV NODE_ENV=prod
ENV MRDASH_PROD_GITLAB_TOKEN=$MRDASH_PROD_GITLAB_TOKEN
ENV MRDASH_PROD_GITLAB_BASE_URI=$MRDASH_PROD_GITLAB_BASE_URI
ENV MRDASH_PROD_PORT=$MRDASH_PROD_PORT

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE $MRDASH_PROD_PORT

CMD [ "npm", "start" ]
