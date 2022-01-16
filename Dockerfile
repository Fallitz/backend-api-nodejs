# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:16

RUN apt-get update && apt-get install nodejs -y

RUN mkdir -p ./usr/src/app
RUN chmod -R 777 ./usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json /usr/src/app
# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production

RUN npm install

COPY . .

EXPOSE 3333
# Run the web service on container startup.
CMD [ "npm", "start" ]