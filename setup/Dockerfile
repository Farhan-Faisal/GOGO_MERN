FROM node:14 AS base 


#### INSTALL CLIENT DEPENDENCIES
WORKDIR /app

COPY server/package*.json ./
RUN npm install
COPY server/ ./


#### BUILD CLIENT IMAGE

FROM node:14-alpine AS service1
WORKDIR /app
COPY --from=base /app/dist /app/dist
COPY --from=base /app/node_modules /app/node_modules
EXPOSE 3000
CMD ["npm", "start"]




