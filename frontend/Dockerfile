FROM node:22.2.0-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

RUN mkdir -p /usr/src/app/frontend

COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY ./frontend/package.json ./frontend/
COPY ./frontend/ ./

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "start"]