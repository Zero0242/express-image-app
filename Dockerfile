FROM node:20-alpine as deps
WORKDIR /app
COPY package.json package.json
RUN yarn install --prod --frozen-lockfile

FROM node:20-alpine as runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY public ./public
COPY src ./src
ENV PORT=3000
EXPOSE 3000
CMD [ "node","./src/app.js" ]