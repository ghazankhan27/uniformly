FROM node:16.19

COPY build .

RUN npm install -g serve

CMD serve -s build