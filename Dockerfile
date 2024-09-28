# Use uma imagem Node.js como base
FROM node:16-alpine

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Compilar o TypeScript para JavaScript
RUN npm run build

# Expor a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação em modo produção
CMD ["npm", "run", "start:prod"]
