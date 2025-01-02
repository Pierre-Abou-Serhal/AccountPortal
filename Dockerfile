### STAGE 1: Build ###
FROM node:20.14.0 AS build
#USER node
WORKDIR /usr/src/app
EXPOSE 8086
COPY package.json package-lock.json ./
RUN npm install
COPY  . .
RUN npm install -g @angular/cli@18.0.2
RUN npm run build --omit=dev
### STAGE 2: Run ###
FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/account-portal/browser /usr/share/nginx/html
