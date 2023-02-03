FROM node:16.19

COPY build build

RUN npm install

RUN npm install -g serve

CMD serve -s build