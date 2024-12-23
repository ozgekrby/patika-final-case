#!/bin/sh

# Start common service
cd /usr/src/app/backend/common
pnpm start &

# Start commerce service
cd /usr/src/app/backend/commerce
pnpm start