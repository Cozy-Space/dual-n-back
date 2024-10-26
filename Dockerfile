FROM node:19 as api

WORKDIR /usr/src/app

COPY --chown=node:node types/ types/
COPY --chown=node:node api/ api/
COPY --chown=node:node package*.json ./

RUN npm ci -w api
RUN npm run build -w api


FROM node:19 as frontend

WORKDIR /usr/src/app

COPY --chown=node:node types/ types/
COPY --chown=node:node frontend/ frontend/
COPY --chown=node:node package*.json ./

RUN npm ci -w frontend
RUN npm run build -w frontend


FROM node:19 as prod

WORKDIR /usr/src/app

COPY --from=api /usr/src/app/api/dist /usr/src/app
COPY --from=frontend /usr/src/app/frontend/dist /usr/src/app/static

COPY --chown=node:node package-lock.json ./
COPY --from=api /usr/src/app/api/package.json ./
RUN npm ci
ENV PROD=True

CMD [ "node", "main.js" ]
