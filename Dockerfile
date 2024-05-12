FROM node:21.4.0-alpine
WORKDIR /app/qrcgen-api
RUN npm install -g nodemon
COPY package*.json .
RUN npm install
COPY . .
RUN mkdir -p ./result
EXPOSE 5005
CMD [ "npm", "start" ]