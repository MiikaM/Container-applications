# The first FROM is now a stage called build-stage
FROM node:16 AS base

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as test

RUN npm ci

COPY . .

RUN CI=true npm test

FROM test as build

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm ci --omit=dev

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine

# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the docker hub page
COPY --from=build /usr/src/app/build /usr/share/nginx/html