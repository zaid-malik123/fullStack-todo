FROM node:20

WORKDIR /app-back

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]