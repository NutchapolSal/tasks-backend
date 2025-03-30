FROM node:22 AS builder
WORKDIR /app
COPY --link package-lock.json package.json ./
RUN npm ci
COPY --link src ./
COPY --link nest-cli.json tsconfig.build.json tsconfig.json eslint.config.mjs .prettierrc ./
RUN <<EOS
    npm run build
    npm prune --production
EOS

FROM node:22
WORKDIR /app
COPY --link --from=builder /app/node_modules ./node_modules
COPY --link --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]