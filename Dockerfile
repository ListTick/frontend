
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY public ./public
COPY src ./src
COPY index.html ./

RUN npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist .

EXPOSE 80

CMD ["serve", "-s", ".", "-l", "80"]
