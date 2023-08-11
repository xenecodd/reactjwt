# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /usr/src/flask-jwt

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV REACT_APP_BASE_URL=http://localhost:5000

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci
RUN npm install react-scripts@5.0.1 -g --silent

# start app
CMD ["npm", "start"]