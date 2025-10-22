#!/usr/bin/env bash
set -e

set -a
source "../Backend/.env"
set +a

jq -n \
  --arg PORT "$PORT" \
  --arg MongoDBURI "$MongoDBURI" \
  --arg ACCESS_TOKEN_EXP "$ACCESS_TOKEN_EXP" \
  --arg REFRESH_TOKEN_EXP "$REFRESH_TOKEN_EXP" \
  '{
    PORT: $PORT,
    MongoDBURI: $MongoDBURI,
    ACCESS_TOKEN_EXP: $ACCESS_TOKEN_EXP,
    REFRESH_TOKEN_EXP: $REFRESH_TOKEN_EXP
  }'
