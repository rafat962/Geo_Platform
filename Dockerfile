FROM node

WORKDIR /app

<<<<<<< HEAD
COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
=======
COPY package*.json ./
RUN npm install

COPY . /app

EXPOSE 5173
CMD ["npm", "run", "dev"]
>>>>>>> salah
