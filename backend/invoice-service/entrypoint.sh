#!/bin/sh

# Start common service
cd /usr/src/app/backend/common
pnpm start &

# Start invoice service
cd /usr/src/app/backend/invoice-service
pnpm start