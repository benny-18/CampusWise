FROM node:22

WORKDIR /app

# no need na ada ini ano kay wa ta man package-lock na file
# COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app/chatbot/server.js"]
