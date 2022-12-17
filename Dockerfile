FROM node:18.12.1

ENV PORT=4000

WORKDIR /app

COPY /package*.json ./

RUN npm install

COPY components/ ./components/

COPY middleware/ ./middleware/

COPY public/ ./public/

COPY routes/ ./routes/

COPY store/ ./store/

COPY views/ ./views/

COPY data/ ./data/

COPY *.js ./

COPY data.json ./

CMD ["node", "index.js"]
