# Etapa de construcción
# Cambiado de node:18-alpine a node:18
FROM node:18 AS build

# Establecer el directorio de trabajo para la aplicación AdonisJS
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json desde el subdirectorio 'api'
COPY api/package*.json ./

# Instalar dependencias de producción (y desarrollo para la construcción)
RUN npm ci
 # <-- Removed --only=production

# Copiar todo el contenido del subdirectorio 'api' al directorio de trabajo
COPY api/ ./

# Construir la aplicación AdonisJS para producción
# Added --ignore-ts-errors flag
RUN node ace build --ignore-ts-errors

# Etapa de producción
# Cambiado de node:18-alpine a node:18
FROM node:18

WORKDIR /usr/src/app

# Copiar artefactos esenciales desde la etapa de construcción
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/config ./config
COPY --from=build /usr/src/app/database ./database
COPY --from=build /usr/src/app/start ./start


ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3333
# APP_KEY se configurará a través de docker-compose.yml

EXPOSE ${PORT}

# Comando para ejecutar migraciones (y opcionalmente seeders) y luego iniciar el servidor
CMD ["sh", "-c", "node ace migration:run --force --seed && node build/server.js"]