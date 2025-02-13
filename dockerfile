# Etapa 1: Construção da aplicação Angular
FROM node:18-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --force

# Copia o código da aplicação
COPY . .

# Compila a aplicação Angular para produção
RUN npm run build --configuration=production

# Etapa 2: Servindo a aplicação com Nginx
FROM nginx:alpine

# Remove configurações padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos compilados do Angular para o Nginx
COPY --from=build /app/dist/energy-payment /usr/share/nginx/html

# Copia um arquivo de configuração do Nginx personalizado (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão do Nginx
EXPOSE 4200

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]

