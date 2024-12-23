#!/bin/sh

# Start common service
cd /usr/src/app/backend/common
pnpm start &

# Start payment service
cd /usr/src/app/backend/payment-service
pnpm start