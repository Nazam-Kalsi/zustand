FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


# ------------------- dev
FROM base AS dev

EXPOSE 5173

CMD ["npm", "run", "dev"]


# ------------------- build
FROM base AS build 

COPY . .

CMD ["npm", "run", "build"]


# ---------------------- prod
FROM node:20-alpine AS prod

WORKDIR /app

RUN npm install -g serve 

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
 