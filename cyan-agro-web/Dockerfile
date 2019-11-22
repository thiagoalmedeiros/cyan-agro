FROM node:latest as build-deps
WORKDIR /usr/src/app
COPY . ./
RUN npm install
COPY package.json package-lock.json ./
RUN npm run build

#Final state
FROM mhart/alpine-node:latest
RUN yarn global add serve
WORKDIR /app
COPY --from=build-deps /usr/src/app/build .
EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]