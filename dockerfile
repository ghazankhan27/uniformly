FROM node:16.19

COPY . .

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD serve -s build