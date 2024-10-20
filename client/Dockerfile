#node block
FROM node:22-alpine3.19 as nodework

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

RUN npm run build


 

#nginx block
FROM nginx:1.27.0 

COPY --from=build /app/build /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=nodework /app/dist .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
