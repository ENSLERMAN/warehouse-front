FROM node:alpine as builder
WORKDIR /
COPY . .

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /dist/warehouse-front /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
