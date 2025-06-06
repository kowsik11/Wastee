FROM node:18
WORKDIR /app
COPY package.json tsconfig.json tailwind.config.ts next.config.js ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile
COPY app ./app
CMD ["pnpm", "dev"]
