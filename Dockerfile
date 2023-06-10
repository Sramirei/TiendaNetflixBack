FROM ubuntu:20.04

USER root

# Actualizar los repositorios y instalar componentes
RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y fail2ban clamav clamav-daemon ufw curl \
    && freshclam

# Instalar Node.js y npm
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs

# Cerrar los puertos para evitar posibles ataques.
RUN ufw default deny incoming \
    && ufw default allow outgoing \
    && ufw allow 9000/tcp \
    && ufw deny 22/tcp \
    && ufw deny 443/tcp \
    && ufw deny 80/tcp \
    && ufw deny 8080/tcp

# App Client
WORKDIR /back
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 9000

# Iniciar apps
CMD sh -c 'cd /back && npm start'
