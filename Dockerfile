# BUILD STEP

FROM node:24-alpine AS build

ARG NODE_ENV="development"

# Deliberately without defaults. Vite inlines these into the bundle at build time, so
# baking values in here would ship one deployment's configuration to everyone who
# builds the image. Supply them at build time — `docker compose build` reads them from
# .env; a plain `docker build` needs --build-arg for each.
#
# Nothing here is secret (all of it reaches the browser), but VITE_REOWN_PROJECT_ID is
# tied to a specific Reown account, so use your own.
#
# Missing any of these fails the build in src/utils/env.ts, which is intended.
ARG VITE_CORE_URL
ARG VITE_INDEXER_URL
ARG VITE_REOWN_PROJECT_ID
ARG VITE_NETWORK
ARG VITE_RPC_URL
ARG VITE_BLOCK_EXPLORER_URL
ARG VITE_LAUNCHPAD_ADDRESS

WORKDIR /usr/src/tokenzyme-app

COPY .yarnrc.yml package.json postcss.config.js tailwind.config.js tsconfig.json vite.config.ts yarn.lock ./
COPY public public/
COPY src src/

RUN corepack enable
RUN yarn install && yarn build

# MAIN STEP

FROM node:24-alpine

ARG NODE_ENV="production"

WORKDIR /usr/src/tokenzyme-app

COPY .yarnrc.yml package.json yarn.lock ./

RUN corepack enable
RUN yarn workspaces focus --production

COPY --from=build /usr/src/tokenzyme-app/dist ./dist

EXPOSE 3001

CMD ["yarn", "start:prod"]
