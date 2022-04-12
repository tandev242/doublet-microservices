FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./ 
EXPOSE 40000
CMD ["npm", "start"]