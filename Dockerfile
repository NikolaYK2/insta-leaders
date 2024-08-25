FROM node:20.11-alpine as dependencies
WORKDIR /app
# Установить pnpm
RUN npm install -g pnpm

COPY package*.json ./
RUN pnpm install

FROM node:20.11-alpine as builder
WORKDIR /app
# Установить pnpm снова, так как это новый этап
RUN npm install -g pnpm

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm run build:production

FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]
