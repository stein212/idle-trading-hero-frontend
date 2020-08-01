FROM node:lts-alpine as dev
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn", "serve"]