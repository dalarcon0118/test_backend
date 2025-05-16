# ---- Etapa 1: Build ----
# Usamos una imagen oficial de Node.js como base.
# 'alpine' es una versión ligera de Linux.
# Puedes especificar una versión de Node si es necesario, ej: node:18-alpine
FROM node:lts-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json (o yarn.lock)
# Copiamos estos archivos primero para aprovechar el cache de Docker.
# Si no cambian, no se volverá a ejecutar npm install en builds posteriores.
COPY package*.json ./

# Instalamos las dependencias del proyecto
# Si usas yarn: RUN yarn install
RUN npm install

# Copiamos el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Construimos la aplicación para producción
# Si usas yarn: RUN yarn build
RUN npm run build

# ---- Etapa 2: Serve ----
# Usamos una imagen oficial de Nginx para servir los archivos estáticos.
FROM nginx:stable-alpine

# Copiamos los archivos estáticos generados en la etapa de 'build'
# desde la carpeta /app/build (del 'builder') a la carpeta por defecto de Nginx.
COPY --from=builder /app/build /usr/share/nginx/html

# (Opcional pero recomendado para SPAs como React)
# Copia una configuración personalizada de Nginx para manejar el enrutamiento del lado del cliente.
# Si no tienes uno, Nginx podría dar 404s al recargar páginas que no sean la raíz.
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# (Descomenta la línea de arriba si tienes un archivo nginx.conf personalizado)

# Expone el puerto 80 (puerto por defecto de Nginx)
EXPOSE 80

# Comando por defecto para iniciar Nginx cuando el contenedor arranque.
# 'daemon off;' asegura que Nginx se ejecute en primer plano, lo cual es necesario para Docker.
CMD ["nginx", "-g", "daemon off;"]