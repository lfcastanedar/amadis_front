# Usa una imagen base de Node.js para construir la aplicación Angular
FROM node:20.11.1

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto 4200 para acceder a la aplicación
EXPOSE 4200

# Comando para iniciar la aplicación Angular en modo desarrollo
CMD ["npm", "start", "--host", "0.0.0.0", "--poll", "2000"]