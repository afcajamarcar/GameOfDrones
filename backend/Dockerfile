FROM node:latest
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
run npm install -g mongoose
COPY . /usr/src/app
EXPOSE 5000
CMD ["npm", "start"]