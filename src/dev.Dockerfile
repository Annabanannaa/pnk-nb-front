FROM node:20.9.0

RUN mkdir -p /app

WORKDIR /app

RUN mkdir -m777 /.npm; \
    mkdir -m777 /.config; \
    mkdir -m777 /.cache; \
    mkdir -m777 /.local; \
    mkdir -m777 /.nuxt; \
    mkdir -m777 /.nitro; \
    mkdir -m777 /.output; \
    mkdir -m777 /.tailwindcss

EXPOSE 3001
EXPOSE 3000

CMD npm run dev
