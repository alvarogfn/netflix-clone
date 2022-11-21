#syntax=docker/dockerfile:1
FROM node:16.18.0-alpine
WORKDIR /app
RUN npm install --global http-server
ENV PATH = "./node_modules/.bin:$PATH"
COPY . . 
RUN npm run build
CMD ["http-server", "dist"]
EXPOSE 8080