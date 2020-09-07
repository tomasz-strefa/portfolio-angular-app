# FROM node:alpine AS builder
# COPY . ./git_test
#vWORKDIR /git_test
# RUN npm i
# RUN $(npm bin)/ng build --prod

# FROM nginx:latest
# COPY --from=builder /git_test/dist/my-first-project/ /usr/share/nginx/html

# stage 1

# ----- OLD
FROM node:alpine AS my-app-build
WORKDIR /app
ENV PATH=${PATH}:./node_modules/.bin
ENV NODE_PATH=./node_modules
ADD package.json /app/
ADD package-lock.json /app/
RUN npm ci
RUN ngcc
ADD . .
# RUN ng build --prod
RUN ng build --source-map=false
#RUN ng serve
# stage 2

FROM nginx:latest
COPY --from=my-app-build /app/dist/* /usr/share/nginx/html
EXPOSE 80

# ----- OLD
### STAGE 1: Build ###
#FROM node:14.8.0-alpine AS build

#WORKDIR /usr/src/app
#ENV PATH=${PATH}:./node_modules/.bin
#ENV NODE_PATH=/usr/src/app/node_modules
#ADD package.json ./
#ADD package-lock.json ./
#RUN npm ci
#RUN ngcc
#ADD . .
#RUN ng build --prod

### STAGE 2: Run ###
##FROM nginx:1.17.1-alpine
#COPY --from=build /usr/src/app/dist/web /usr/share/nginx/html
#COPY default.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
