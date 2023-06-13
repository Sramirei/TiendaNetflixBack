# Utiliza una imagen base de Node.js
FROM node:18.15

# Establece el directorio de trabajo en el contenedor
WORKDIR /back

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente de la aplicación al directorio de trabajo
COPY . .

# Instala el paquete tzdata para configurar la zona horaria
RUN apt-get update && \
    apt-get install -y tzdata

# Configura la zona horaria deseada
ENV TZ=America/Bogota

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 9000

# Comando para ejecutar la aplicación cuando el contenedor se inicia
CMD [ "node", "index.js" ]
