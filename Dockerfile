FROM node:22

WORKDIR /docker

COPY . /docker

RUN npm install

CMD ["npm", "run", "start"]
