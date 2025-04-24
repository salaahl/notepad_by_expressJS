FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app /app

RUN npm prune --production

EXPOSE 3000

# Lancer l'application
CMD ["node", "index.js"]
