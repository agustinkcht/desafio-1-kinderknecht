# comments van con hashtag

FROM node
# app type (node)

WORKDIR /desafios-kinderknecht
# path to save, name of the proj/img

COPY package*.json ./
# copy package.json & package-lock.json to the container
# with * you copy all files "package" with extension ".json"

RUN npm install
# install packages

COPY . .
# copy whole app

EXPOSE 8080
# Port to run (not necesarilly dev/prod/test... is the port where the container is gonna run)
# It's recommended to be the same as server tho

CMD ["npm", "start"]
# init commands (array with the words separated with comma)
