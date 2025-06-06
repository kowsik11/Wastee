FROM node:18
WORKDIR /app
COPY package.json pnpm-lock.yaml* tsconfig.json ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile
COPY src ./src
CMD ["pnpm", "dev"]
