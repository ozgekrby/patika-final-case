FROM node:22.2.0-alpine

# Set Working Directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Create backend directory
RUN mkdir -p /usr/src/app/backend
RUN mkdir -p /usr/src/app/backend/commerce
RUN mkdir -p /usr/src/app/backend/common

# Copy Application Code
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY ./backend/common/package.json ./backend/common/
COPY ./backend/commerce/package.json ./backend/commerce/


COPY ./backend/commerce /usr/src/app/backend/commerce
COPY ./backend/common /usr/src/app/backend/common

RUN pnpm install

COPY ./backend/commerce/entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Expose Port
EXPOSE 3010

# Start Application
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]