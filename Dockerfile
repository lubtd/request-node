FROM mhart/alpine-node:latest
WORKDIR /app
ADD package.json package.json
ADD tsconfig.json tsconfig.json
RUN npm install
RUN npm install typescript -g
ADD src src
RUN npm run-script build