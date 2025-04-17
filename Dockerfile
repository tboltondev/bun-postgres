FROM oven/bun:latest

WORKDIR /usr/app

COPY package.json ./
COPY bun.lockb ./
COPY src ./src

RUN bun install

EXPOSE 10000

CMD ["bun", "--hot", "src/index.ts"]